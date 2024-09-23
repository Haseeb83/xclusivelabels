import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const payments = sqliteTable("payments", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),
	gateway: text("gateway").notNull(),
	credit: integer("credit").notNull(),
	current_balance: integer("current_balance").notNull(),
	new_balance: integer("new_balance").notNull(),
	status: text("status").default("pending"),
	data_id: integer("data_id"),
	user_email: text("user_email").notNull(),
	user_name: text("user_name").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
	amount: integer("amount").notNull(),
	items: text("items").notNull(),
	date: integer("payment_date").notNull(),
	customer_name: text("customer").notNull(),
	label_uuid: text("label_uuid").notNull(),
});

export type PaymentsSelectModel = InferSelectModel<typeof payments>;
export type PaymentsInsertModel = InferInsertModel<typeof payments>;
