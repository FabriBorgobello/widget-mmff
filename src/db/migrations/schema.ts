import {
  pgTable,
  unique,
  serial,
  varchar,
  timestamp,
  foreignKey,
  integer,
  date,
  numeric,
} from "drizzle-orm/pg-core";

export const mmffSymbols = pgTable(
  "mmff_symbols",
  {
    id: serial().primaryKey().notNull(),
    code: varchar({ length: 3 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [unique("mmff_symbols_code_unique").on(table.code)],
);

export const mmffExchangeRates = pgTable(
  "mmff_exchange_rates",
  {
    id: serial().primaryKey().notNull(),
    baseCurrencyId: integer("base_currency_id").notNull(),
    targetCurrencyId: integer("target_currency_id").notNull(),
    date: date().notNull(),
    rate: numeric({ precision: 18, scale: 6 }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.baseCurrencyId],
      foreignColumns: [mmffSymbols.id],
      name: "mmff_exchange_rates_base_currency_id_mmff_symbols_id_fk",
    }),
    foreignKey({
      columns: [table.targetCurrencyId],
      foreignColumns: [mmffSymbols.id],
      name: "mmff_exchange_rates_target_currency_id_mmff_symbols_id_fk",
    }),
  ],
);
