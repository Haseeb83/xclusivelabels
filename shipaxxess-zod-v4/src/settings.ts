import { z } from "zod";

export const PROFILETAB = z.object({
	first_name: z.string(),
	last_name: z.string(),
	email_address: z.string().email(),
	password: z.string().optional(),
	timezone: z.string(),
	two_fa: z.enum(["true", "false"]),
});

export type PROFILETAB = z.infer<typeof PROFILETAB>;

export const NOTIFICATIONSTAB = z.object({
	type: z.string(),
	status: z.boolean(),
});

export type NOTIFICATIONSTAB = z.infer<typeof NOTIFICATIONSTAB>;

export const COUPONTAB = z.object({
	coupon_code: z.string(),
});

export type COUPONTAB = z.infer<typeof COUPONTAB>;

export const PAYMENTTAB = z.object({
	stripe_key: z.string().optional(),
	stripe_secret: z.string().optional(),
	stripe_webhook_secret: z.string().optional(),
	coinbase_key: z.string().optional(),
	coinbase_webhook_secret: z.string().optional(),
	venmo_email: z.string().optional(),
	cashapp_email: z.string().optional(),
	zelle_email: z.string().optional(),
});

export type PAYMENTTAB = z.infer<typeof PAYMENTTAB>;

export const EMAILTAB = z.object({
	email_smtp_host: z.string(),
	email_smtp_port: z.string(),
	email_smtp_user: z.string(),
	email_smtp_password: z.string(),
	email_from_name: z.string(),
	email_from_address: z.string(),
});

export type EMAILTAB = z.infer<typeof EMAILTAB>;

export const LABELTAB = z.object({
	label_apikey: z.string(),
	label_host: z.string(),
});

export type LABELTAB = z.infer<typeof LABELTAB>;
