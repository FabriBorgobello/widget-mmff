import { serial, varchar } from "drizzle-orm/pg-core";

import { mmffPgTable, timestamps } from "./utils";

export const symbols = mmffPgTable("symbols", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  ...timestamps,
});
