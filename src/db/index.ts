import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/config/server";

import { continents } from "./schema/continents";
import { exchangeRates } from "./schema/exchange_rates";
import { symbols } from "./schema/symbols";

export const db = drizzle(env.DATABASE_URL, {
  casing: "snake_case", // https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing
  schema: { symbols, exchangeRates, continents },
  logger: true,
});
