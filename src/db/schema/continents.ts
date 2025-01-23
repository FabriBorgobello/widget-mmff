import { serial, varchar } from "drizzle-orm/pg-core";

import { mmffPgTable, timestamps } from "./utils";

export const continents = mmffPgTable("continents", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  code: varchar("code", { length: 2 }).notNull().unique(),
  ...timestamps,
});
