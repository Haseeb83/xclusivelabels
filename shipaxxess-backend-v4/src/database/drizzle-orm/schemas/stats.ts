import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stats = sqliteTable("stats", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),
	month: integer("month").notNull(),
	day: integer("day").notNull(),
	year: integer("year").notNull(),
	type: text("type").$type<"payments" | "shipments" | "types">().notNull(),
	type_label: text("type_label"),
	data: integer("data"),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type StatsSelectModel = InferSelectModel<typeof stats>;
export type StatsInsertModel = InferInsertModel<typeof stats>;
