import { z } from "zod";
export declare const PROFILETAB: z.ZodObject<{
    first_name: z.ZodString;
    last_name: z.ZodString;
    email_address: z.ZodString;
    password: z.ZodOptional<z.ZodString>;
    timezone: z.ZodString;
    two_fa: z.ZodEnum<["true", "false"]>;
}, "strip", z.ZodTypeAny, {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    password?: string;
    timezone?: string;
    two_fa?: "true" | "false";
}, {
    first_name?: string;
    last_name?: string;
    email_address?: string;
    password?: string;
    timezone?: string;
    two_fa?: "true" | "false";
}>;
export type PROFILETAB = z.infer<typeof PROFILETAB>;
export declare const NOTIFICATIONSTAB: z.ZodObject<{
    type: z.ZodString;
    status: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type?: string;
    status?: boolean;
}, {
    type?: string;
    status?: boolean;
}>;
export type NOTIFICATIONSTAB = z.infer<typeof NOTIFICATIONSTAB>;
export declare const COUPONTAB: z.ZodObject<{
    coupon_code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    coupon_code?: string;
}, {
    coupon_code?: string;
}>;
export type COUPONTAB = z.infer<typeof COUPONTAB>;
export declare const PAYMENTTAB: z.ZodObject<{
    stripe_key: z.ZodOptional<z.ZodString>;
    stripe_secret: z.ZodOptional<z.ZodString>;
    stripe_webhook_secret: z.ZodOptional<z.ZodString>;
    coinbase_key: z.ZodOptional<z.ZodString>;
    coinbase_webhook_secret: z.ZodOptional<z.ZodString>;
    venmo_email: z.ZodOptional<z.ZodString>;
    cashapp_email: z.ZodOptional<z.ZodString>;
    zelle_email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    stripe_key?: string;
    stripe_secret?: string;
    stripe_webhook_secret?: string;
    coinbase_key?: string;
    coinbase_webhook_secret?: string;
    venmo_email?: string;
    cashapp_email?: string;
    zelle_email?: string;
}, {
    stripe_key?: string;
    stripe_secret?: string;
    stripe_webhook_secret?: string;
    coinbase_key?: string;
    coinbase_webhook_secret?: string;
    venmo_email?: string;
    cashapp_email?: string;
    zelle_email?: string;
}>;
export type PAYMENTTAB = z.infer<typeof PAYMENTTAB>;
export declare const EMAILTAB: z.ZodObject<{
    email_smtp_host: z.ZodString;
    email_smtp_port: z.ZodString;
    email_smtp_user: z.ZodString;
    email_smtp_password: z.ZodString;
    email_from_name: z.ZodString;
    email_from_address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email_smtp_host?: string;
    email_smtp_port?: string;
    email_smtp_user?: string;
    email_smtp_password?: string;
    email_from_name?: string;
    email_from_address?: string;
}, {
    email_smtp_host?: string;
    email_smtp_port?: string;
    email_smtp_user?: string;
    email_smtp_password?: string;
    email_from_name?: string;
    email_from_address?: string;
}>;
export type EMAILTAB = z.infer<typeof EMAILTAB>;
export declare const LABELTAB: z.ZodObject<{
    label_apikey: z.ZodString;
    label_host: z.ZodString;
}, "strip", z.ZodTypeAny, {
    label_apikey?: string;
    label_host?: string;
}, {
    label_apikey?: string;
    label_host?: string;
}>;
export type LABELTAB = z.infer<typeof LABELTAB>;
//# sourceMappingURL=settings.d.ts.map