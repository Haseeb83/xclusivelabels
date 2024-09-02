import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const addresses = sqliteTable("addresses", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id"),
	full_name: text("full_name").notNull(),
	company_name: text("company_name"),
	street_one: text("street_one").notNull(),
	street_two: text("street_two"),
	city: text("city").notNull(),
	zip: text("zip").notNull(),
	state: text("state").notNull(),
	country: text("country").notNull(),
	phone_number: text("phone_number"),
	default: integer("default", { mode: "boolean" }).default(false).notNull(),
	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type AddressesSelectModel = InferSelectModel<typeof addresses>;
export type AddressesInsertModel = InferInsertModel<typeof addresses>;
