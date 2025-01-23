import { defineConfig } from "drizzle-kit";

import { env } from "./src/config/server";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  tablesFilter: ["mmff_*"],
  casing: "snake_case",
});
