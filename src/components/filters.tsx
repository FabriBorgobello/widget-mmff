"use client";

import { useState, useEffect } from "react";

import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { fetchExchangeRates } from "@/app/mock";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
  "ARS",
  "BTC",
];

export function Filters() {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    "USD",
    "EUR",
  ]);
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const handleFetchRates = async () => {
      if (startDate && endDate && selectedCurrencies.length > 0) {
        const data = await fetchExchangeRates(
          selectedCurrencies,
          startDate,
          endDate,
        );
        const formattedData = Object.entries(data.rates).map(
          ([date, rates]) => ({ date, ...rates }),
        );
        setChartData(formattedData);
      }
    };

    handleFetchRates();
  }, [selectedCurrencies, startDate, endDate]);

  return (
    <Card className="mx-auto w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Currency Exchange Rates</CardTitle>
        <CardDescription>
          Compare exchange rates for selected currencies over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[200px] flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Select Currencies
              </label>
              <Select
                onValueChange={(value) =>
                  setSelectedCurrencies((prev) => [...prev, value])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies
                    .filter((c) => !selectedCurrencies.includes(c))
                    .map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                End Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCurrencies.map((currency) => (
              <Button
                key={currency}
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedCurrencies((prev) =>
                    prev.filter((c) => c !== currency),
                  )
                }
              >
                {currency} ×
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(tick) =>
                  format(parse(tick, "yyyy-MM-dd", new Date()), "MMM d")
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) =>
                  format(parse(label, "yyyy-MM-dd", new Date()), "MMM d, yyyy")
                }
                formatter={(value, name) => [
                  `1 USD = ${name === "BTC" ? Number(value).toFixed(8) : Number(value).toFixed(4)} ${name}`,
                  name,
                ]}
              />
              <Legend />
              {selectedCurrencies.map((currency, index) => (
                <Line
                  key={currency}
                  type="monotone"
                  dataKey={currency}
                  stroke={`hsl(${(index * 137.5) % 360}, 70%, 50%)`}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
