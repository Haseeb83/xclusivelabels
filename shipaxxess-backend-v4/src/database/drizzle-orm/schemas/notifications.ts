import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { query } from "express";

export const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").notNull(),
  user_id: integer("user_id"),
  title: text("title").notNull(),
  query: text("query").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  read: integer("read", { mode: "boolean" }).default(false),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
