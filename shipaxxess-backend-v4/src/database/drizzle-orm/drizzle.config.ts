import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/drizzle-orm/schemas/*",
  out: "./src/database/drizzle-orm/migrations",
  driver: "pg",
} satisfies Config;
