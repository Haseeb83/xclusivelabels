import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const adminWeights = sqliteTable("adminWeights", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	type_id: integer("type_id").notNull(),
	weight: integer("weight").notNull(),
	width: integer("width").notNull(),
	width_percent: integer("width_percent").notNull(),
	height: integer("height").notNull(),
	height_percent: integer("height_percent").notNull(),
	length: integer("length").notNull(),
	length_percent: integer("length_percent").notNull(),
	user_cost: integer("user_cost").notNull(),
	reseller_cost: integer("reseller_cost").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type AdminWeightsSelectModel = InferSelectModel<typeof adminWeights>;
export type AdminWeightsInsertModel = InferInsertModel<typeof adminWeights>;
