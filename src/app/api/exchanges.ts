import { eq, gte, lte, and, inArray } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { exchangeRates } from "@/db/schema/exchange_rates";

import { CurrencyCode } from "../types";

const exchangeRateRequestSchema = z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  currencies: z.array(z.string().length(3)),
});

const exchangeRateResponseSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
  rates: z.array(
    z.object({
      targetCurrencyId: z.string(),
      rate: z.string(),
    }),
  ),
});

export type ExchangeRateResponse = z.infer<typeof exchangeRateResponseSchema>;

export async function getExchangeRates({
  startDate,
  endDate,
  currencies,
}: {
  startDate: string;
  endDate: string;
  currencies: CurrencyCode[];
}): Promise<ExchangeRateResponse> {
  const parsed = exchangeRateRequestSchema.parse({
    start_date: startDate,
    end_date: endDate,
    currencies,
  });

  const rates = await db
    .select({
      date: exchangeRates.date,
      targetCurrencyId: exchangeRates.targetCurrencyId,
      rate: exchangeRates.rate,
    })
    .from(exchangeRates)
    .where(
      and(
        eq(exchangeRates.baseCurrencyId, "USD"),
        gte(exchangeRates.date, parsed.start_date),
        lte(exchangeRates.date, parsed.end_date),
        inArray(exchangeRates.targetCurrencyId, parsed.currencies),
      ),
    );

  return exchangeRateResponseSchema.parse({
    start_date: startDate,
    end_date: endDate,
    rates: rates.map((rate) => ({
      targetCurrencyId: rate.targetCurrencyId,
      rate: rate.rate,
    })),
  });
}
