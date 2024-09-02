import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const crons = sqliteTable("crons", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	label_uuid: text("label_uuid").notNull(),
	meta_data: text("meta_data").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type CronsSelectModel = InferSelectModel<typeof crons>;
export type CronsInsertModel = InferInsertModel<typeof crons>;
