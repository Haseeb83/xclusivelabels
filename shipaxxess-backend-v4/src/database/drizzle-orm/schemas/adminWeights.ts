import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const adminWeights = sqliteTable("adminWeights", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	type_id: integer("type_id").notNull(),
	from_weight: integer("from_weight").notNull(),
	to_weight: integer("to_weight").notNull(),
	user_cost: integer("user_cost").notNull(),
	reseller_cost: integer("reseller_cost").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type AdminWeightsSelectModel = InferSelectModel<typeof adminWeights>;
export type AdminWeightsInsertModel = InferInsertModel<typeof adminWeights>;
