CREATE TABLE `addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer,
	`full_name` text NOT NULL,
	`company_name` text,
	`street_one` text NOT NULL,
	`street_two` text,
	`city` text NOT NULL,
	`zip` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`phone_number` text,
	`default` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `adminSettings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`setting_id` text NOT NULL,
	`setting_value` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `adminWeights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`type_id` integer NOT NULL,
	`from_weight` integer NOT NULL,
	`to_weight` integer NOT NULL,
	`user_cost` integer NOT NULL,
	`reseller_cost` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `batchs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`name` text,
	`total_labels` integer NOT NULL,
	`failed_labels` integer DEFAULT 0,
	`status_message` text,
	`status_label` text DEFAULT 'processing',
	`status_refund` integer DEFAULT false,
	`is_downloaded` integer DEFAULT false,
	`pdf_r2_link` text,
	`remote_id` integer,
	`tracking_number` text,
	`sender_full_name` text NOT NULL,
	`sender_company_name` text,
	`sender_street_one` text NOT NULL,
	`sender_street_two` text,
	`sender_city` text NOT NULL,
	`sender_zip` text NOT NULL,
	`sender_state` text NOT NULL,
	`sender_country` text NOT NULL,
	`sender_phone` text,
	`recipient` text NOT NULL,
	`type` text NOT NULL,
	`type_label` text NOT NULL,
	`type_value` text NOT NULL,
	`weight_unit` text NOT NULL,
	`package_id` integer,
	`package_name` text,
	`package_width` integer NOT NULL,
	`package_height` integer NOT NULL,
	`package_length` integer NOT NULL,
	`package_weight` integer NOT NULL,
	`cost_user` integer NOT NULL,
	`cost_reseller` integer NOT NULL,
	`shipping_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`reference1` text,
	`description` text,
	`saturday` integer DEFAULT false,
	`signature` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`ticket_uuid` text NOT NULL,
	`message` text NOT NULL,
	`message_profile` text NOT NULL,
	`message_author` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `crons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`label_uuid` text NOT NULL,
	`meta_data` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `labels` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`batch_uuid` text,
	`status_message` text,
	`status_label` text DEFAULT 'inqueue',
	`status_refund` integer DEFAULT false,
	`is_downloaded` integer DEFAULT false,
	`pdf_r2_link` text,
	`remote_id` integer,
	`remote_pdf_link` text,
	`tracking_number` text,
	`sender_full_name` text NOT NULL,
	`sender_company_name` text,
	`sender_street_one` text NOT NULL,
	`sender_street_two` text,
	`sender_city` text NOT NULL,
	`sender_zip` text NOT NULL,
	`sender_state` text NOT NULL,
	`sender_country` text NOT NULL,
	`sender_phone` text,
	`recipent_full_name` text NOT NULL,
	`recipent_company_name` text,
	`recipent_street_one` text NOT NULL,
	`recipent_street_two` text,
	`recipent_city` text NOT NULL,
	`recipent_zip` text NOT NULL,
	`recipent_state` text NOT NULL,
	`recipent_country` text NOT NULL,
	`recipent_phone` text,
	`type` text NOT NULL,
	`type_label` text NOT NULL,
	`type_value` text NOT NULL,
	`weight_unit` text NOT NULL,
	`package_id` integer,
	`package_uuid` text,
	`package_name` text,
	`package_width` integer NOT NULL,
	`package_height` integer NOT NULL,
	`package_length` integer NOT NULL,
	`package_weight` integer NOT NULL,
	`cost_user` integer NOT NULL,
	`cost_reseller` integer NOT NULL,
	`shipping_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	`reference1` text,
	`description` text,
	`saturday` integer DEFAULT false,
	`signature` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`read` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `packages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	`weight` integer NOT NULL,
	`height` integer NOT NULL,
	`width` integer NOT NULL,
	`length` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`gateway` text NOT NULL,
	`credit` integer NOT NULL,
	`current_balance` integer NOT NULL,
	`new_balance` integer NOT NULL,
	`status` text DEFAULT 'pending',
	`data_id` integer,
	`user_email` text NOT NULL,
	`user_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `refunds` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email_address` text NOT NULL,
	`batch_uuid` text,
	`label_uuid` text,
	`waiting_for` integer DEFAULT 3,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`month` integer NOT NULL,
	`day` integer NOT NULL,
	`year` integer NOT NULL,
	`type` text NOT NULL,
	`type_label` text,
	`data` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`type` text,
	`store_name` text NOT NULL,
	`eb_access_token` text,
	`eb_refresh_token` text,
	`eb_expires_in` integer,
	`store_url` text,
	`consumer_key` text,
	`consumer_secret` text,
	`sf_api_key` text,
	`sf_api_password` text,
	`sf_api_access_token` text,
	`sf_store_url` text,
	`bc_store_hash` text,
	`bc_access_token` text,
	`ss_api_key` text,
	`mg_store_url` text,
	`mg_access_token` text,
	`et_key_string` text,
	`et_shared_secret` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`data_id` text,
	`content` text NOT NULL,
	`status` text DEFAULT 'active',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL,
	`unit` text DEFAULT 'lb',
	`type` text DEFAULT 'usps',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email_address` text NOT NULL,
	`password` text NOT NULL,
	`timezone` text DEFAULT 'US/Eastern',
	`refer_from` text,
	`email_verified` integer DEFAULT false,
	`isadmin` integer DEFAULT false NOT NULL,
	`email_code` integer NOT NULL,
	`email_code_request` integer DEFAULT 0,
	`coupon_code` text,
	`delete_account` integer DEFAULT false,
	`current_ip` text,
	`remember_last_ip` text,
	`two_fa` text DEFAULT 'true',
	`temp_fa_code` text,
	`current_balance` integer DEFAULT 0 NOT NULL,
	`total_spent` integer DEFAULT 0 NOT NULL,
	`total_refund` integer DEFAULT 0 NOT NULL,
	`referral_current_balance` integer DEFAULT 0 NOT NULL,
	`total_labels` integer DEFAULT 0 NOT NULL,
	`credit_for_refer_from_user` integer DEFAULT 0 NOT NULL,
	`marketing_email_notify` integer DEFAULT false,
	`labels_email_notify` integer DEFAULT false,
	`topups_email_notify` integer DEFAULT false,
	`tickets_email_notify` integer DEFAULT false,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `weights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`type_id` integer NOT NULL,
	`weight` integer NOT NULL,
	`user_cost` integer NOT NULL,
	`reseller_cost` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`type_id`) REFERENCES `types`(`id`) ON UPDATE no action ON DELETE no action
);
