import { Model } from "@lib/model";
import { addresses } from "@schemas/addresses";
import { Address, Id } from "@shipaxxess/shipaxxess-zod-v4";
import { and, eq } from "drizzle-orm";
import { Context } from "hono";
import { v4 } from "uuid";

const Get = async (c: Context<App, "/:uuid">) => {
	const uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const res = await model.get(addresses, and(eq(addresses.uuid, uuid), eq(addresses.user_id, c.get("jwtPayload").id)));

	return c.json(res);
};

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const res = await model.all(addresses, eq(addresses.user_id, c.get("jwtPayload").id));

	return c.json(res);
};

const Create = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Address.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.insert(addresses, {
		city: parse.city,
		country: parse.country,
		full_name: parse.full_name,
		state: parse.state,
		street_one: parse.street_one,
		uuid: v4(),
		zip: parse.zip,
		company_name: parse.company_name,
		street_two: parse.street_two,
		phone_number: parse.phone,
		user_id: c.get("jwtPayload").id,
	});

	return c.json({ success: true });
};

const Edit = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Address.IDZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.get(addresses, eq(addresses.id, parse.id));

	await model.update(addresses, parse, eq(addresses.id, parse.id));

	return c.json({ success: true });
};

const Delete = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Id.ZODSCHEMA.parse(body);

	const model = new Model(c.env.DB);

	await model.get(addresses, eq(addresses.id, parse.id));

	await model.delete(addresses, eq(addresses.id, parse.id));

	return c.json({ success: true });
};

const AddressesUser = { Create, Edit, Delete, GetAll, Get };

export { AddressesUser };
