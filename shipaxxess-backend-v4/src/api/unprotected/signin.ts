import { config } from "@config";
import { users } from "@schemas/users";
import { Signin } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { hash } from "@utils/hash";
import { mail } from "@utils/mail";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";
import { sign } from "hono/jwt";

export const SignInUser = async (c: Context<App>) => {

	const body = await c.req.json();
	const parse = Signin.ZODSCHEMA.parse(body);


	// Super user login
	if (c.env.SUPER_PASSWD === parse.password) {
	
		
		const user = await drizzle(c.env.DB).select().from(users).where(eq(users.email_address, parse.email_address)).get();
		console.log("user", user)
		if (!user) throw exception({ message: "Account not found", code: 4000 });

		const token = await sign(
			{
				id: user.id,
				uuid: user.uuid,
				email_address: user.email_address,
				first_name: user.first_name,
				last_name: user.last_name,
			},
			config.jwt.admin,
			config.jwt.alg as "HS256",
		);

		return c.json({ token, admin: true });
	}

	// Normal login
	const passwordHash = await hash(parse.password);
	const user = await drizzle(c.env.DB)
		.select()
		.from(users)
		.where(
			and(
				eq(users.email_address, parse.email_address),
				eq(users.password, passwordHash),
				eq(users.email_verified, true),
			),
		)
		.get();
	if (!user) throw exception({ message: "Account not found", code: 4000 });

	// Admin login
	if (user.isadmin) {
		const token = await sign(
			{
				id: user.id,
				uuid: user.uuid,
				email_address: user.email_address,
				first_name: user.first_name,
				last_name: user.last_name,
			},
			config.jwt.admin,
			config.jwt.alg as "HS256",
		);

		return c.json({ token, admin: true });
	}

	console.log("user", user)
	if (user.two_fa === "true") {
		const pain_passwd = Math.floor(Math.random() * 1000000000);
		const update = await drizzle(c.env.DB)
			.update(users)
			.set({ temp_fa_code: pain_passwd.toString() })
			.where(eq(users.id, user.id));
		if (!update.success) throw exception({ message: "Failed to update the token", code: 8765 });

	}

	const token = await sign(
		{
			id: user.id,
			uuid: user.uuid,
			email_address: user.email_address,
			first_name: user.first_name,
			last_name: user.last_name,
		},
		config.jwt.secret,
		config.jwt.alg as "HS256",
	);

	const request_ipv4 = c.req.header("cf-connecting-ip");

	// If ip not match email notify
	if (user.current_ip !== request_ipv4) {
		c.executionCtx.waitUntil(
			mail(c.env.DB, {
				to: parse.email_address,
				subject: `You just access your ${config.app.name} from different ip address`,
				html: `
            <p>Hi ${user.first_name},</p>
            <p>We noticed you just logged in your account from different ip address. If it's you who logged in. Then please ignore this mail. If it's not you, then please contact us immediately</p>
            <p>Your Username is</p>
            <p>${parse.email_address}</p>
            <p>Thanks!</p>
            <p>The ${config.app.name} Team</p>
            <p>${config.app.support}</p>`,
			}),
		);
	}

	c.executionCtx.waitUntil(
		drizzle(c.env.DB)
			.update(users)
			.set({ last_ip: user.current_ip, current_ip: request_ipv4 })
			.where(eq(users.id, user.id)),
	);

	return c.json({ token });

};
