import type { NextRequest } from "next/server";

import { and, eq, gte, lte, inArray, not } from "drizzle-orm";

import { db } from "@/db";
import { exchangeRates } from "@/db/schema/exchange_rates";

import {
  exchangeRateRequestSchema,
  exchangeRateResponseSchema,
} from "./schemas";

export async function GET(request: NextRequest) {
  const res = exchangeRateRequestSchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries()),
  );
  if (!res.success) {
    return Response.json({ error: res.error.flatten() }, { status: 400 });
  }
  const query = res.data;
  const data = await db
    .select({
      date: exchangeRates.date,
      targetCurrencyId: exchangeRates.targetCurrencyId,
      rate: exchangeRates.rate,
    })
    .from(exchangeRates)
    .where(
      and(
        eq(exchangeRates.baseCurrencyId, "USD"),
        gte(exchangeRates.date, query.start_date),
        lte(exchangeRates.date, query.end_date),
        query.currencies &&
          inArray(exchangeRates.targetCurrencyId, query.currencies),
        not(inArray(exchangeRates.targetCurrencyId, ["USD"])),
      ),
    );

  const formatted = {
    start_date: query.start_date,
    end_date: query.end_date,
    rates: data.reduce<Record<string, Record<string, number>>>(
      (acc, { date, targetCurrencyId, rate }) => {
        if (!acc[date]) {
          acc[date] = {};
        }
        acc[date][targetCurrencyId] = 1 / Number(rate);
        return acc;
      },
      {},
    ),
  };

  return Response.json(exchangeRateResponseSchema.parse(formatted));
}
