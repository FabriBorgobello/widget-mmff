import type { NextRequest } from "next/server";

import { and, eq, gte, lte, inArray } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { exchangeRates } from "@/db/schema/exchange_rates";

import { currencyCodeSchema } from "../types";

const dateSchema = z
  .string()
  .refine(
    (value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(value),
    { message: "Invalid date format. Expected YYYY-MM-DD." },
  );

const exchangeRateRequestSchema = z.object({
  start_date: dateSchema,
  end_date: dateSchema,
  currencies: z
    .string()
    .transform((value) => value.split(",").map((item) => item.trim()))
    .pipe(z.array(currencyCodeSchema))
    .optional(),
});

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.searchParams);
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
        acc[date][targetCurrencyId] = Number(rate);
        return acc;
      },
      {},
    ),
  };

  return Response.json(formatted);
}
