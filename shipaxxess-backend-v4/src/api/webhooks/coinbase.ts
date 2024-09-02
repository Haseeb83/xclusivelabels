import { Model } from "@lib/model";
import { payments } from "@schemas/payments";
import { users } from "@schemas/users";
import { log } from "@utils/log";
import { eq } from "drizzle-orm";
import { Context } from "hono";

export const CoinbaseWebhook = async (c: Context<App>) => {
	try {
		const body = await c.req.json();

		if (body.event.type !== "charge:confirmed") {
			throw new Error("not ready to process");
		}

		if (!body.event.data.metadata.topup_id) {
			throw new Error("topup id not found in the webhook data object");
		}

		const topup_uuid = body.event.data.metadata.topup_id;
		const user_id = Number(body.event.data.metadata.user_id);

		const model = new Model(c.env.DB);

		const user = await model.get(users, eq(users.id, user_id));
		if (!user) throw new Error("user not found");

		const topup = await model.get(payments, eq(payments.uuid, topup_uuid));
		if (!topup) throw new Error("topup not found");

		await model.update(
			payments,
			{
				status: "confirmed",
			},
			eq(payments.uuid, topup_uuid),
		);

		await model.update(
			users,
			{
				current_balance: user.current_balance + topup.credit,
			},
			eq(users.id, user_id),
		);

		log(`CoinbaseWebhook: topup ${topup_uuid} confirmed`);

		return c.json({ success: true });
	} catch (e) {
		log(`CoinbaseWebhook: ${(e as Error).message}`);
		return c.json({ success: false });
	}
};
