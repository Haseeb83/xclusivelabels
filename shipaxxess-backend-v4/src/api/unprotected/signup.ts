import { config } from "@config";
import { initSettings } from "@helpers/query";
import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { Signup } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { hash } from "@utils/hash";
import { mail } from "@utils/mail";
import { generateSixDigitRandomNumber } from "@utils/math";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

export const SignUpUser = async (c: Context<App>) => {
	try {
		const body = await c.req.json();
		const parse = Signup.ZODSCHEMA.parse(body);

		const model = new Model(c.env.DB);

		const haveUser = await model.get(users, eq(users.email_address, parse.email_address));
		if (haveUser) throw exception({ message: "Already have an account", code: 1000 });

		const email_code = generateSixDigitRandomNumber();
		const passwordHash = await hash(parse.password);
		const [insert] = await model.insert(users, {
			email_code,
			uuid: v4(),
			first_name: parse.first_name,
			last_name: parse.last_name,
			email_address: parse.email_address,
			password: passwordHash,
			refer_from: parse.refer_from ? parse.refer_from : null,
			last_ip: c.req.header("cf-connecting-ip"),
			current_ip: c.req.header("cf-connecting-ip"),
		});



		if (insert.id === 1) {
			await initSettings(c.env.DB);
			await model.update(users, { isadmin: true }, eq(users.id, insert.id));
		}
		console.log("email_code", email_code)

		// if c.env==dev then return email_code in message else return message
		if (c.env == "dev") {
			return c.json({
				message: `Verification code is ${email_code}`,
				success: true,
				code: 1004,
			});
		}






		c.executionCtx.waitUntil(
			mail(c.env.DB, {
				to: parse.email_address,
				subject: `Please verify your ${config.app.name} Account`,
				html: `
		<p>Thanks for signing up! Please verify this is your correct email by simply copying the code below. You can then log into your account.</p>
		<p>Your Username is</p>
		<p>${parse.email_address}</p>
		<p>Thanks!</p>
		<p>The ${config.app.name} Team</p>
		<br/>
		<p>Your verification code is:</p>
		<h1>${email_code}</h1>
		`,
			}),
		);




		return c.json({
			message: "Verification mail is sent to your email address, please check the inbox/spam folder",
			success: true,
			code: 1004,

		});
	} catch (error) {
		console.log("error", error)
		return c.json(error)

	}
};
