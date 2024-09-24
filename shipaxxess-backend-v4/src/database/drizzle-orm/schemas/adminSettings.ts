import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const adminSettings = sqliteTable("adminSettings", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	setting_id: text("setting_id").notNull(),
	setting_value: text("setting_value").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type AdminSettingsSelectModel = InferSelectModel<typeof adminSettings>;
export type AdminSettingsInsertModel = InferInsertModel<typeof adminSettings>;
