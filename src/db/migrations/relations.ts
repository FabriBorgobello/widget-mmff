import { relations } from "drizzle-orm/relations";

import { mmffSymbols, mmffExchangeRates } from "./schema";

export const mmffExchangeRatesRelations = relations(
  mmffExchangeRates,
  ({ one }) => ({
    mmffSymbol_baseCurrencyId: one(mmffSymbols, {
      fields: [mmffExchangeRates.baseCurrencyId],
      references: [mmffSymbols.id],
      relationName: "mmffExchangeRates_baseCurrencyId_mmffSymbols_id",
    }),
    mmffSymbol_targetCurrencyId: one(mmffSymbols, {
      fields: [mmffExchangeRates.targetCurrencyId],
      references: [mmffSymbols.id],
      relationName: "mmffExchangeRates_targetCurrencyId_mmffSymbols_id",
    }),
  }),
);

export const mmffSymbolsRelations = relations(mmffSymbols, ({ many }) => ({
  mmffExchangeRates_baseCurrencyId: many(mmffExchangeRates, {
    relationName: "mmffExchangeRates_baseCurrencyId_mmffSymbols_id",
  }),
  mmffExchangeRates_targetCurrencyId: many(mmffExchangeRates, {
    relationName: "mmffExchangeRates_targetCurrencyId_mmffSymbols_id",
  }),
}));
