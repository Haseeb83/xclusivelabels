import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	// Ids
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),

	// Information
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email_address: text("email_address").notNull(),
	password: text("password").notNull(),
	timezone: text("timezone").default("US/Eastern"),
	refer_from: text("refer_from"),

	// Config
	email_verified: integer("email_verified", { mode: "boolean" }).default(false),
	isadmin: integer("isadmin", { mode: "boolean" }).notNull().default(false),
	email_code: integer("email_code").notNull(),
	email_code_request: integer("email_code_request").default(0),
	coupon_code: text("coupon_code"),
	delete_account: integer("delete_account", { mode: "boolean" }).default(false),
	current_ip: text("current_ip"),
	last_ip: text("remember_last_ip"),

	// 2fa
	two_fa: text("two_fa").default("true"),
	temp_fa_code: text("temp_fa_code"),

	// Account
	current_balance: integer("current_balance").notNull().default(0),
	total_spent: integer("total_spent").notNull().default(0),
	total_refund: integer("total_refund").notNull().default(0),
	referral_current_balance: integer("referral_current_balance").notNull().default(0),
	total_labels: integer("total_labels").notNull().default(0),
	credit_for_refer_from_user: integer("credit_for_refer_from_user").notNull().default(0),

	// Notifications
	marketing_email_notify: integer("marketing_email_notify", { mode: "boolean" }).default(false),
	labels_email_notify: integer("labels_email_notify", { mode: "boolean" }).default(false),
	topups_email_notify: integer("topups_email_notify", { mode: "boolean" }).default(false),
	tickets_email_notify: integer("tickets_email_notify", { mode: "boolean" }).default(false),

	// Database time
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type UsersSelectModel = InferSelectModel<typeof users>;
export type UsersInsertModel = InferInsertModel<typeof users>;
