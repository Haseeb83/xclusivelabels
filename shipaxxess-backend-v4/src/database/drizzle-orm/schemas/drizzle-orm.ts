import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

// Initialize SQLite database connection
const sqlite = new Database('./src/database/drizzle-orm/db.sqlite', { verbose: console.log });

// Create Drizzle instance
export const db = drizzle(sqlite);

// Run migrations
migrate(db, { migrationsFolder: './src/database/drizzle-orm/migrations' });

export default db;
