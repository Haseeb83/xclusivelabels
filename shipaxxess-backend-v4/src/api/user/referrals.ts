import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { eq } from "drizzle-orm";
import { Context } from "hono";

const Get = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const rf = await model.all(users, eq(users.refer_from, c.get("jwtPayload").uuid));

	return c.json(rf);
};

const ReferralsUser = { Get };

export { ReferralsUser };
