import { config } from "@config";
import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { Verify } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { sign } from "hono/jwt";

export const VerifyUser = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Verify.ZODSCHEMA.parse(body);

	if (parse.type !== "email_verification") {
		throw exception({ code: 1089, message: "Invalid Method" });
	}

	const model = new Model(c.env.DB);

	const code = await model.get(
		users,
		and(eq(users.email_code, parseInt(parse.code)), eq(users.email_address, parse.email_address)),
	);
	if (!code) {
		throw exception({ code: 1090, message: "Invalid code" });
	}

	if (code.email_code_request! > 5) {
		throw exception({ code: 1091, message: "Too many attempts, email address has been banned" });
	}

	const token = await sign(
		{
			id: code.id,
			uuid: code.uuid,
			email_address: code.email_address,
			first_name: code.first_name,
			last_name: code.last_name,
		},
		config.jwt.secret,
		config.jwt.alg as "HS256",
	);

	await model.update(users, { email_verified: true }, eq(users.id, code.id));

	return c.json({ token, success: true });
};
