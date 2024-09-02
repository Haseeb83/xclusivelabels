ALTER TABLE refunds ADD `is_refunded` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE refunds ADD `is_recycled` integer DEFAULT false;