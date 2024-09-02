import { Model } from "@lib/model";
import { payments } from "@schemas/payments";
import { users } from "@schemas/users";
import { Payment } from "@shipaxxess/shipaxxess-zod-v4";
import { coinbaseCharge } from "@utils/coinbase";
import { exception } from "@utils/error";
import { getSettings } from "@utils/settings";
import { stripeCheckout } from "@utils/stripe";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const Get = async (c: Context<App>) => {
	const model = new Model(c.env.DB);
	console.log("model")

	const pt = await model.all(payments, eq(payments.user_id, c.get("jwtPayload").id));

	return c.json(pt);
};

const Create = async (c: Context<App>) => {
	// Validation
	const body = await c.req.json();
	const parse = Payment.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) throw exception({ message: "User not found", code: 404 });

	const payment_uuid = v4();

	await model.insert(payments, {
		credit: parse.credit,
		gateway: parse.gateway,
		current_balance: user.current_balance,
		new_balance: user.current_balance + parse.credit,
		user_id: user.id,
		uuid: payment_uuid,
		user_email: user.email_address,
		user_name: `${user.first_name} ${user.last_name}`,
	});

	// Handle card payment
	if (parse.gateway === "card") {
		const settings = await getSettings(c.env.DB);
		if (!settings["stripe_secret"]) throw exception({ message: "Stripe key not found", code: 404 });
		if (!settings["stripe_webhook_secret"]) throw exception({ message: "Stripe webhook key not found", code: 404 });

		const res = await stripeCheckout(settings["stripe_secret"], {
			amount: parse.credit,
			title: "Demo app topup",
			topup_uuid: payment_uuid,
			user_id: c.get("jwtPayload").id,
		});

		return c.json({ url: res.url });
	}

	// Hanlde crypto payment
	if (parse.gateway === "crypto") {
		const settings = await getSettings(c.env.DB);
		if (!settings["coinbase_key"]) throw exception({ message: "Coinbase key not found", code: 404 });
		if (!settings["coinbase_webhook_secret"]) throw exception({ message: "Coinbase webhook key not found", code: 404 });

		const res = await coinbaseCharge(settings["coinbase_key"], {
			amount: parse.credit,
			topup_uuid: payment_uuid,
			user_id: c.get("jwtPayload").id,
		});
		return c.json({ url: res.hosted_url });
	}

	return c.json({ success: true });
};

const Getway = async (c: Context<App>) => {
	const settings = await getSettings(c.env.DB);

	return c.json({
		venmo_email: settings["venmo_email"],
		cashapp_email: settings["cashapp_email"],
		zelle_email: settings["zelle_email"],
	});
};

const PaymentUser = { Create, Get, Getway };

export { PaymentUser };

