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
console.log(weight)
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
		weight: parseInt(parse.weight),
		width: parseInt(parse.width),
		width_percent: parseInt(parse.width_percent),
		height: parseInt(parse.height),
		height_percent: parseInt(parse.height_percent),
		length: parseInt(parse.length),
		length_percent: parseInt(parse.length_percent),
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
			weight: parseInt(parse.weight),
			width: parseInt(parse.width),
			width_percent: parseInt(parse.width_percent),
			height: parseInt(parse.height),
			height_percent: parseInt(parse.height_percent),
			length: parseInt(parse.length),
			length_percent: parseInt(parse.length_percent),
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