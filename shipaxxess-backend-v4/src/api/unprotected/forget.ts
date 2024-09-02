import { config } from "@config";
import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { Forget } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { mail } from "@utils/mail";
import { eq } from "drizzle-orm";
import { Context } from "hono";

export const ForgetPassword = async (c: Context<App>) => {
	// Validation
	const body = await c.req.json();
	const parse = Forget.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.email_address, parse.email_address));
	if (!user) throw exception({ message: "Account not found", code: 4000 });

	// Verification mail
	c.executionCtx.waitUntil(
		mail(c.env.DB, {
			to: parse.email_address,
			subject: `You requested to reset your ${config.app.name} account password`,
			html: `
		<p>Hi ${user.first_name}, You have requested to reset your ${config.app.name} password. Here is the link:</p>
		<p>Your Username is</p>
		<p>${parse.email_address}</p>
		<p>Thanks!</p>
		<p>The ${config.app.name} Team</p>
		<br/>
		<a href="${c.env.FRONTEND_URL}/verify?token=${user.email_code}&date=${Date.now()}&type=reset>${
				c.env.FRONTEND_URL
			}/verify?token=${user.email_code}&date=${Date.now()}&type=reset</a>
		`,
		}),
	);

	return c.json({ message: "We will send you a mail with verification link" });
};
