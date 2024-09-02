import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const refunds = sqliteTable("refunds", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),
	first_name: text("first_name").notNull(),
	last_name: text("last_name").notNull(),
	email_address: text("email_address").notNull(),
	batch_uuid: text("batch_uuid"),
	label_uuid: text("label_uuid"),
	waiting_for: integer("waiting_for").default(3),
	is_refunded: integer("is_refunded", { mode: "boolean" }).default(false),
	is_recycled: integer("is_recycled", { mode: "boolean" }).default(false),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type RefundsSelectModel = InferSelectModel<typeof refunds>;
export type RefundsInsertModel = InferInsertModel<typeof refunds>;
