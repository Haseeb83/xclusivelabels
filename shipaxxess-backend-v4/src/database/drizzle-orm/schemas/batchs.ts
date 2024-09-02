import { Labels } from "@shipaxxess/shipaxxess-zod-v4";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const batchs = sqliteTable("batchs", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),
	name: text("name"),

	total_labels: integer("total_labels").notNull(),
	failed_labels: integer("failed_labels").default(0),

	// Status
	status_message: text("status_message"),
	status_label: text("status_label").default("processing"),
	status_refund: integer("status_refund", { mode: "boolean" }).default(false),
	is_downloaded: integer("is_downloaded", { mode: "boolean" }).default(false),

	// Remote data
	merge_pdf_key: text("pdf_r2_link"),
	remote_id: integer("remote_id"),
	tracking_number: text("tracking_number"),

	// Sender
	sender_full_name: text("sender_full_name").notNull(),
	sender_company_name: text("sender_company_name"),
	sender_street_one: text("sender_street_one").notNull(),
	sender_street_two: text("sender_street_two"),
	sender_city: text("sender_city").notNull(),
	sender_zip: text("sender_zip").notNull(),
	sender_state: text("sender_state").notNull(),
	sender_country: text("sender_country").notNull(),
	sender_phone: text("sender_phone"),

	// Recipients
	recipients: text("recipient", { mode: "json" }).$type<Labels.RECIPIENTSCHEMAARRAY>().notNull(),

	// Type
	type: text("type").notNull(),
	type_label: text("type_label").notNull(),
	type_value: text("type_value").notNull(),
	type_unit: text("weight_unit").notNull(),

	// Package
	package_id: integer("package_id"),
	package_name: text("package_name"),
	package_width: integer("package_width").notNull(),
	package_height: integer("package_height").notNull(),
	package_length: integer("package_length").notNull(),
	package_weight: integer("package_weight").notNull(),

	// Costs
	cost_user: integer("cost_user").notNull(),
	cost_reseller: integer("cost_reseller").notNull(),

	// Date
	shipping_date: text("shipping_date").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),

	// Ups
	reference1: text("reference1"),
	description: text("description"),
	saturday: integer("saturday", { mode: "boolean" }).default(false),
	signature: integer("signature", { mode: "boolean" }).default(false),
});

export type BatchsSelectModel = InferSelectModel<typeof batchs>;
export type BatchsInsertModel = InferInsertModel<typeof batchs>;
