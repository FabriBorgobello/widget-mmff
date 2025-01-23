import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pgEnum, varchar } from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { mmffPgTable, timestamps } from "./utils";

export const continentCodesEnum = pgEnum("continent_codes", [
  "AF",
  "AN",
  "AS",
  "EU",
  "NA",
  "OC",
  "SA",
  "N/A",
]);

export const continents = mmffPgTable("continents", {
  code: continentCodesEnum().unique().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  ...timestamps,
});

/** SCHEMAS */
export const continentSelectSchema = createSelectSchema(continents);
export const continentInsertSchema = createInsertSchema(continents);
export const continentUpdateSchema = createUpdateSchema(continents);

/** TYPES */
export type Continent = InferSelectModel<typeof continents>;
export type ContinentInsert = InferInsertModel<typeof continents>;
export type ContinentUpdate = z.infer<typeof continentUpdateSchema>;
