"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ExchangeRateResponse,
  exchangeRateResponseSchema,
} from "@/app/exchange_rates/schemas";
import { Filters } from "@/app/page";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { env } from "@/config/client";
import { stringToHslColor } from "@/lib/utils";

/** Formats the exchange rate data into a format that the chart can consume */
function formatChartData(data: ExchangeRateResponse) {
  return Object.entries(data.rates).map(([date, symbols]) => ({
    date,
    ...symbols,
  }));
}

interface FormattedFilters {
  start_date?: string;
  end_date?: string;
  currencies?: string;
}

/** Fetches exchange rates from the server */
async function getExchangeRates(
  query: FormattedFilters,
): Promise<ExchangeRateResponse> {
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/exchange_rates`);
  if (query.start_date)
    url.searchParams.set("start_date", format(query.start_date, "yyyy-MM-dd"));
  if (query.end_date)
    url.searchParams.set("end_date", format(query.end_date, "yyyy-MM-dd"));
  if (query.currencies) url.searchParams.set("currencies", query.currencies);

  const res = await fetch(url.toString());
  return exchangeRateResponseSchema.parse(await res.json());
}

export function ChartContent({ filters }: { filters: Filters }) {
  /** Formats the filters into a format that the server can consume */
  const formattedFilters: FormattedFilters = {
    start_date: filters.dates?.start_date
      ? format(filters.dates.start_date, "yyyy-MM-dd")
      : undefined,
    end_date: filters.dates?.end_date
      ? format(filters.dates.end_date, "yyyy-MM-dd")
      : undefined,
    currencies:
      filters.currencies && filters.currencies.length
        ? filters.currencies.join(",")
        : undefined,
  };

  const { data } = useSuspenseQuery({
    queryKey: ["rates", formattedFilters],
    queryFn: () => getExchangeRates(formattedFilters),
  });

  /**
   * The chart configuration object.
   * Used to assign colors to each currency in the chart
   */
  const chartConfig: ChartConfig = filters.currencies
    ? filters.currencies.reduce<
        Record<string, { label: string; color: string }>
      >((acc, currency) => {
        acc[currency] = { label: currency, color: "hsl(0, 100%, 50%)" };
        return acc;
      }, {})
    : {};

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart
        accessibilityLayer
        data={formatChartData(data)}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          type="number"
          tickMargin={8}
          tickFormatter={(value) => value.toFixed(2)}
        />
        <XAxis
          dataKey="date"
          type="category"
          interval={Math.ceil(Object.keys(data.rates).length / 10)}
          tickMargin={8}
          tickFormatter={(value) => format(value, "MMM dd")}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />

        {filters.currencies?.map((currency) => {
          const color = stringToHslColor(currency);
          return (
            <Area
              key={currency}
              dataKey={currency}
              type="natural"
              fill={color}
              fillOpacity={0.4}
              stroke={color}
              stackId={currency}
            />
          );
        })}
      </AreaChart>
    </ChartContainer>
  );
}
