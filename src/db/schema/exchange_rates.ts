import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { date, index, integer, numeric, serial } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { symbols } from "./symbols";
import { mmffPgTable, timestamps } from "./utils";

export const exchangeRates = mmffPgTable(
  "exchange_rates",
  {
    id: serial("id").primaryKey(),
    baseCurrencyId: integer("base_currency_id")
      .notNull()
      .references(() => symbols.id),
    targetCurrencyId: integer("target_currency_id")
      .notNull()
      .references(() => symbols.id),
    date: date("date").notNull(),
    rate: numeric("rate", { precision: 18, scale: 6 }).notNull(),
    ...timestamps,
  },
  (table) => [
    {
      dateIndex: index("date_idx").on(table.date),
      currencyPairIndex: index("currency_pair_idx").on(
        table.baseCurrencyId,
        table.targetCurrencyId,
        table.date,
      ),
    },
  ],
);

/** SCHEMAS */
export const exchangeRateSelectSchema = createSelectSchema(exchangeRates);
export const exchangeRateInsertSchema = createInsertSchema(exchangeRates);
export const exchangeRateUpdateSchema = createUpdateSchema(exchangeRates);

/** TYPES */
export type ExchangeRate = InferSelectModel<typeof exchangeRates>;
export type ExchangeRateInsert = InferInsertModel<typeof exchangeRates>;
export type ExchangeRateUpdate = z.infer<typeof exchangeRateUpdateSchema>;
