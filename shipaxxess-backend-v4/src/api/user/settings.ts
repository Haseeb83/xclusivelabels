import { Model } from "@lib/model";
import { users } from "@schemas/users";
import { Settings } from "@shipaxxess/shipaxxess-zod-v4";
import { exception } from "@utils/error";
import { hash } from "@utils/hash";
import { eq } from "drizzle-orm";
import { Context } from "hono";

const Get = async (c: Context<App>) => {
	const model = new Model(c.env.DB);
	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));

	return c.json(user);
};

const Profile = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.PROFILETAB.parse(body);

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) throw exception({ message: "User not found", code: 404 });

	if (parse.password === "") delete parse.password;

	await model.update(
		users,
		{
			...parse,
			password: parse.password ? await hash(parse.password) : undefined,
		},
		eq(users.id, user.id),
	);

	return c.json({ success: true });
};

const Notifications = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.NOTIFICATIONSTAB.parse(body);

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) throw exception({ message: "User not found", code: 404 });

	await model.update(
		users,
		{
			[parse.type]: parse.status,
		},
		eq(users.id, user.id),
	);

	return c.json({ success: true });
};

const Coupon = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.COUPONTAB.parse(body);

	const model = new Model(c.env.DB);

	const user = await model.get(users, eq(users.id, c.get("jwtPayload").id));
	if (!user) throw exception({ message: "User not found", code: 404 });

	await model.update(users, parse, eq(users.id, user.id));

	return c.json({ success: true });
};

export const SettingsUser = { Profile, Get, Notifications, Coupon };
