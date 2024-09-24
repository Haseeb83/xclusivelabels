import { Model } from "@lib/model";
import { types } from "@schemas/types";
import { Context } from "hono";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const dt = await model.all(types);

	return c.json(dt);
};

const TypeUser = { GetAll };

export { TypeUser };
