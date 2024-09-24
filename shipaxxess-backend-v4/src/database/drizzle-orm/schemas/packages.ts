import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const packages = sqliteTable("packages", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id"),
	name: text("name").notNull(),
	weight: integer("weight").notNull(),
	height: integer("height").notNull(),
	width: integer("width").notNull(),
	length: integer("length").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type PackagesSelectModel = InferSelectModel<typeof packages>;
export type PackagesInsertModel = InferInsertModel<typeof packages>;
