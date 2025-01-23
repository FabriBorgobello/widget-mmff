import { integer, serial, varchar } from "drizzle-orm/pg-core";

import { continents } from "./continents";
import { mmffPgTable, timestamps } from "./utils";

export const symbols = mmffPgTable("symbols", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  continentId: integer("continent_id")
    .notNull()
    .references(() => continents.id),

  ...timestamps,
});
