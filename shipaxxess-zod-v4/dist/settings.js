"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LABELTAB = exports.EMAILTAB = exports.PAYMENTTAB = exports.COUPONTAB = exports.NOTIFICATIONSTAB = exports.PROFILETAB = void 0;
var zod_1 = require("zod");
exports.PROFILETAB = zod_1.z.object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    email_address: zod_1.z.string().email(),
    password: zod_1.z.string().optional(),
    timezone: zod_1.z.string(),
    two_fa: zod_1.z.enum(["true", "false"]),
});
exports.NOTIFICATIONSTAB = zod_1.z.object({
    type: zod_1.z.string(),
    status: zod_1.z.boolean(),
});
exports.COUPONTAB = zod_1.z.object({
    coupon_code: zod_1.z.string(),
});
exports.PAYMENTTAB = zod_1.z.object({
    stripe_key: zod_1.z.string().optional(),
    stripe_secret: zod_1.z.string().optional(),
    stripe_webhook_secret: zod_1.z.string().optional(),
    coinbase_key: zod_1.z.string().optional(),
    coinbase_webhook_secret: zod_1.z.string().optional(),
    venmo_email: zod_1.z.string().optional(),
    cashapp_email: zod_1.z.string().optional(),
    zelle_email: zod_1.z.string().optional(),
});
exports.EMAILTAB = zod_1.z.object({
    email_smtp_host: zod_1.z.string(),
    email_smtp_port: zod_1.z.string(),
    email_smtp_user: zod_1.z.string(),
    email_smtp_password: zod_1.z.string(),
    email_from_name: zod_1.z.string(),
    email_from_address: zod_1.z.string(),
});
exports.LABELTAB = zod_1.z.object({
    label_apikey: zod_1.z.string(),
    label_host: zod_1.z.string(),
});
