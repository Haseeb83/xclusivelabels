-- Migration number: 0002 	 2024-05-29T03:15:40.213Z
-- migrations/2024-05-29_add_admin_settings.sql

-- Create the adminSetting table
CREATE TABLE adminSetting (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_id TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data into adminSetting table
INSERT INTO adminSetting (setting_id, setting_value, created_at, updated_at) VALUES
('stripe_key', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('stripe_secret', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('stripe_webhook_secret', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('coinbase_key', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('coinbase_webhook_secret', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('venmo_email', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('cashapp_email', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('zelle_email', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('label_apikey', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('label_host', '', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_smtp_host', ' smtp.gmail.com', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_smtp_port', '465', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_smtp_user', 'mydev.com@gmail.com', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_smtp_password', 'Mtr@14197', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_from_name', 'Aamar Shahzad', '2024-05-29 00:06:54', '2024-05-29 00:06:54'),
('email_from_address', 'mydev.com@gmail.com', '2024-05-29 00:06:54', '2024-05-29 00:06:54');
