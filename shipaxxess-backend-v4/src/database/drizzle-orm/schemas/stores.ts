import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const stores = sqliteTable("stores", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	uuid: text("uuid").notNull(),
	user_id: integer("user_id").notNull(),

	type: text("type").$type<
		"WooCommerce" | "Shopify" | "BigCommerce" | "Squarespace" | "Magento" | "Etsy" | "Ebay" | "Amazon"
	>(),

	store_name: text("store_name").notNull(),

	// Ebay
	eb_access_token: text("eb_access_token"),
	eb_refresh_token: text("eb_refresh_token"),
	eb_expires_in: integer("eb_expires_in"),

	// WooCommerce
	wc_store_url: text("store_url"),
	wc_consumer_key: text("consumer_key"),
	wc_consumer_secret: text("consumer_secret"),

	// Shopify
	sf_api_key: text("sf_api_key"),
	sf_api_password: text("sf_api_password"),
	sf_api_access_token: text("sf_api_access_token"),
	sf_store_url: text("sf_store_url"),

	// BigCommerce
	bc_store_hash: text("bc_store_hash"),
	bc_access_token: text("bc_access_token"),

	// Squarespace
	ss_api_key: text("ss_api_key"),

	// Magento
	mg_store_url: text("mg_store_url"),
	mg_access_token: text("mg_access_token"),

	// Etsy
	et_key_string: text("et_key_string"),
	et_shared_secret: text("et_shared_secret"),

	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type StoresSelectModel = InferSelectModel<typeof stores>;
export type StoresInsertModel = InferInsertModel<typeof stores>;
