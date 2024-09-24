import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { eq } from "drizzle-orm";
import { Context } from "hono";

export const StatusAdmin = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const ad = await model.get(users, eq(users.id, c.get("jwtPayload").id));

	return c.json(ad);
};
