import { adminSettings } from "@schemas/adminSettings";
import { drizzle } from "drizzle-orm/d1";

export const getSettings = async (db: D1Database) => {
	const settings = await drizzle(db).select().from(adminSettings).all();


	const config: { [x: string]: string } = {};

	settings.map((nod) => {
		config[nod.setting_id] = nod.setting_value;
	});

	return config;
};
