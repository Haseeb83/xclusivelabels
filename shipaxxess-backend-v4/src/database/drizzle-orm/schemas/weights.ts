import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { types } from "./types";

export const weights = sqliteTable("weights", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	type_id: integer("type_id")
		.notNull()
		.references(() => types.id),
	weight: integer("weight").notNull(),
	user_cost: integer("user_cost").notNull(),
	reseller_cost: integer("reseller_cost").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type WeightsSelectModel = InferSelectModel<typeof weights>;
export type WeightsInsertModel = InferInsertModel<typeof weights>;
