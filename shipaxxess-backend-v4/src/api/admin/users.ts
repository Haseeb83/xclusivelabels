import { Model } from "@lib/model";
import { UsersSelectModel, users } from "@schemas/users";
import { eq } from "drizzle-orm";
import { Context } from "hono";

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const urs = await model.all(users);

	return c.json(urs);
};

const Get = async (c: Context<App, "/:uuid">) => {
	const user_uuid = c.req.param("uuid");

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.uuid, user_uuid));

	return c.json(user);
};

const Create = async (c: Context<App>) => {
	return c.json({});
};

const Edit = async (c: Context<App>) => {
	const body = (await c.req.json()) as UsersSelectModel;

	const model = new Model(c.env.DB);

	await model.update(
		users,
		{
			first_name: body.first_name,
			last_name: body.last_name,
			email_address: body.email_address,
			coupon_code: body.coupon_code,
			current_balance: body.current_balance,
			total_spent: body.total_spent,
			total_refund: body.total_refund,
			total_labels: body.total_labels,
			credit_for_refer_from_user: body.credit_for_refer_from_user,
		},
		eq(users.id, body.id),
	);

	return c.json({ success: true });
};

const Delete = async (c: Context<App>) => {
	return c.json({});
};

const MakeAdmin = async (c: Context<App, "/:id">) => {
	const user_id = c.req.param("id");

	const model = new Model(c.env.DB);

	await model.update(users, { isadmin: true }, eq(users.id, Number(user_id)));

	return c.json({ success: true });
};

const UsersAdmin = { Get, Create, Edit, Delete, GetAll, MakeAdmin };

export { UsersAdmin };
