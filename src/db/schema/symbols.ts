import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { continentCodesEnum, continents } from "./continents";
import { mmffPgTable, timestamps } from "./utils";

export const symbols = mmffPgTable("symbols", {
  id: varchar("id", { length: 3 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  continentId: continentCodesEnum()
    .notNull()
    .references(() => continents.id),
  ...timestamps,
});

/** SCHEMAS */
export const symbolSelectSchema = createSelectSchema(symbols);
export const symbolInsertSchema = createInsertSchema(symbols);
export const symbolUpdateSchema = createUpdateSchema(symbols);

/** TYPES */
export type Symbol = InferSelectModel<typeof symbols>;
export type SymbolInsert = InferInsertModel<typeof symbols>;
export type SymbolUpdate = z.infer<typeof symbolUpdateSchema>;
