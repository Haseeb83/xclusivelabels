import { Model } from "@lib/model";
import { stores } from "@schemas/stores";
import { eq } from "drizzle-orm";
import { Context } from "hono";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const st = await model.all(stores, eq(stores.user_id, c.get("jwtPayload").id));

	return c.json(st);
};

export const StoreUser = { GetAll };
