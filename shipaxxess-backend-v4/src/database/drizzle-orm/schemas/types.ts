import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const types = sqliteTable("types", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	label: text("label").notNull(),
	value: text("value").notNull(),
	unit: text("unit").$type<"oz" | "lb">().default("lb"),
	type: text("type").$type<"usps" | "ups">().default("usps"),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type TypesSelectModel = InferSelectModel<typeof types>;
export type TypesInsertModel = InferInsertModel<typeof types>;
