import { Model } from "@lib/model";
import { packages } from "@schemas/packages";
import { Id, Package } from "@shipaxxess/shipaxxess-zod-v4";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const pe = await model.all(packages, eq(packages.user_id, c.get("jwtPayload").id));

	return c.json(pe);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const model = new Model(c.env.DB);

	const pe = await model.get(
		packages,
		and(eq(packages.uuid, c.req.param("uuid")), eq(packages.user_id, c.get("jwtPayload").id)),
	);

	return c.json(pe);
};

const Create = async (c: Context<App>) => {
	// Validation
	const body = await c.req.json();
	const parse = Package.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);
	await model.insert(packages, {
		height: parse.height,
		length: parse.length,
		name: parse.name,
		uuid: v4(),
		weight: parse.weight,
		width: parse.width,
		user_id: c.get("jwtPayload").id,
		unit: parse.radio,
	});

	return c.json({ success: true });
};

const Edit = async (c: Context<App>) => {
	// Validation
	const body = await c.req.json();
	const parse = Package.IDZODSCHEMA.parse(body);
	const updateData = {
		height: parse.height,
		length: parse.length,
		name: parse.name,
		weight: parse.weight,
		width: parse.width,
		unit: parse.radio,
	};
	const model = new Model(c.env.DB);
	await model.get(packages, eq(packages.id, parse.id));
	await model.update(packages, updateData, eq(packages.id, parse.id));
	return c.json({ success: true });
};

const Delete = async (c: Context<App>) => {
	// Validation
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.get(packages, eq(packages.id, parse.id));

	await model.delete(packages, eq(packages.id, parse.id));

	return c.json({ success: true });
};

const PackagesUser = { Get, Create, Edit, Delete, GetAll };

export { PackagesUser };