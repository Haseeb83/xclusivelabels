import { Model } from "@lib/model";
import { adminWeights } from "@schemas/adminWeights";
import { types } from "@schemas/types";
import { Id, Type } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const tp = await model.all(types);

	return c.json(tp);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const type_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const tp = await model.get(types, eq(types.uuid, type_uuid));

	return c.json(tp);
};

const Create = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Type.CREATESCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.insert(types, {
		uuid: v4(),
		label: parse.label,
		value: parse.value,
		unit: parse.unit,
		type: parse.type,
	});

	return c.json({ success: true });
};

const Edit = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Type.EDITSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const check = await model.get(types, eq(types.id, parse.id));
	if (!check) throw exception({ message: "Type not found", code: 404 });

	await model.update(
		types,
		{
			label: parse.label,
			value: parse.value,
			unit: parse.unit,
			type: parse.type,
		},
		eq(types.id, parse.id),
	);

	return c.json({ success: true });
};

const Delete = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	const check = await model.get(types, eq(types.id, parse.id));
	if (!check) throw exception({ message: "Type not found", code: 404 });

	await model.delete(adminWeights, eq(adminWeights.type_id, parse.id));

	await model.delete(types, eq(types.id, parse.id));

	return c.json({ success: true });
};

const TypesAdmin = { GetAll, Create, Edit, Delete, Get };

export { TypesAdmin };
