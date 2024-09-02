import { initSettings } from "@helpers/query";
import { Model } from "@lib/model";
import { adminSettings } from "@schemas/adminSettings";
import { Settings } from "@shipaxxess/shipaxxess-zod-v4";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";

const Init = async (c: Context<App>) => {
	await initSettings(c.env.DB);

	return c.json({ success: true });
};

const GetAll = async (c: Context<App>) => {
	const model = new Model(c.env.DB);

	const settings = await model.all(adminSettings);

	return c.json(settings);
};

const Payment = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.PAYMENTTAB.parse(body);

	await drizzle(c.env.DB).batch([
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.stripe_key })
			.where(eq(adminSettings.setting_id, "stripe_key")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.stripe_secret })
			.where(eq(adminSettings.setting_id, "stripe_secret")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.stripe_webhook_secret })
			.where(eq(adminSettings.setting_id, "stripe_webhook_secret")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.coinbase_key })
			.where(eq(adminSettings.setting_id, "coinbase_key")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.coinbase_webhook_secret })
			.where(eq(adminSettings.setting_id, "coinbase_webhook_secret")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.venmo_email })
			.where(eq(adminSettings.setting_id, "venmo_email")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.cashapp_email })
			.where(eq(adminSettings.setting_id, "cashapp_email")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.zelle_email })
			.where(eq(adminSettings.setting_id, "zelle_email")),
	]);

	return c.json({ success: true });
};

const Email = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.EMAILTAB.parse(body);

	await drizzle(c.env.DB).batch([
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.email_smtp_host })
			.where(eq(adminSettings.setting_id, "email_smtp_host")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: String(parse.email_smtp_port) })
			.where(eq(adminSettings.setting_id, "email_smtp_port")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.email_smtp_user })
			.where(eq(adminSettings.setting_id, "email_smtp_user")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.email_smtp_password })
			.where(eq(adminSettings.setting_id, "email_smtp_password")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.email_from_name })
			.where(eq(adminSettings.setting_id, "email_from_name")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.email_from_address })
			.where(eq(adminSettings.setting_id, "email_from_address")),
	]);

	return c.json({ success: true });
};

const Label = async (c: Context<App>) => {
	const body = await c.req.json();
	const parse = Settings.LABELTAB.parse(body);

	await drizzle(c.env.DB).batch([
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.label_apikey })
			.where(eq(adminSettings.setting_id, "label_apikey")),
		drizzle(c.env.DB)
			.update(adminSettings)
			.set({ setting_value: parse.label_host })
			.where(eq(adminSettings.setting_id, "label_host")),
	]);

	return c.json({ success: true });
};

export const AdminSettings = { GetAll, Payment, Email, Label, Init };
