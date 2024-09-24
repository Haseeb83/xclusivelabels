import { getAdminWeights } from "@helpers/query";
import { Model } from "@lib/model";
import { adminWeights } from "@schemas/adminWeights";
import { Id, Weights } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const wt = await getAdminWeights(c.env.DB);

	return c.json(wt);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const weight_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const weight = await model.get(adminWeights, eq(adminWeights.uuid, weight_uuid));
	if (!weight) throw exception({ message: "Weight not found", code: 404 });

	return c.json(weight);
};

const Create = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Weights.CREATESCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.insert(adminWeights, {
		reseller_cost: parse.reseller_cost,
		user_cost: parse.user_cost,
		type_id: parseInt(parse.type_id),
		from_weight: parse.from_weight,
		to_weight: parse.to_weight,
		uuid: v4(),
	});

	return c.json({ success: true });
};

const Edit = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Weights.EDITSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.update(
		adminWeights,
		{
			reseller_cost: parse.reseller_cost,
			user_cost: parse.user_cost,
			type_id: parseInt(parse.type_id),
			from_weight: parse.from_weight,
			to_weight: parse.to_weight,
		},
		eq(adminWeights.id, parse.id),
	);

	return c.json({ success: true });
};

const Delete = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const check = await model.get(adminWeights, eq(adminWeights.id, parse.id));
	if (!check) throw exception({ message: "Weight not found", code: 404 });

	await model.delete(adminWeights, eq(adminWeights.id, parse.id));

	return c.json({ success: true });
};

const WeightsAdmin = { GetAll, Create, Edit, Delete, Get };

export { WeightsAdmin };
