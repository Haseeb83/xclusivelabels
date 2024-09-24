import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chats = sqliteTable("chats", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),
	ticket_uuid: text("ticket_uuid").notNull(),
	message: text("message").notNull(),
	message_profile: text("message_profile").notNull(),
	message_author: text("message_author").notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type ChatsSelectModel = InferSelectModel<typeof chats>;
export type ChatsInsertModel = InferInsertModel<typeof chats>;
