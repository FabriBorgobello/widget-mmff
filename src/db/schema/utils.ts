import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
export const mmffPgTable = pgTableCreator((name) => `mmff_${name}`);

export const timestamps = {
  updatedAt: timestamp({ mode: "string" }).$onUpdate(
    () => sql`CURRENT_TIMESTAMP`,
  ),
  createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  deletedAt: timestamp({ mode: "string" }),
};
