"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Chart } from "@/components/chart";
import { FiltersForm } from "@/components/filters";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const filtersSchema = z
  .object({
    dates: z.object({
      start_date: z.date(),
      end_date: z.date(),
    }),
    currencies: z.array(z.string()).min(1, "Select at least one currency"),
  })
  .refine(({ dates }) => dates.start_date <= dates.end_date, {
    path: ["dates"],
    message: "Start date must be before end date",
  });

export type Filters = z.infer<typeof filtersSchema>;

const FILTERS_DEFAULTS: Filters = {
  dates: {
    start_date: new Date("2024-12-01"),
    end_date: new Date("2024-12-31"),
  },
  currencies: [],
};

export default function Home() {
  const methods = useForm<Filters>({
    defaultValues: FILTERS_DEFAULTS,
    resolver: zodResolver(filtersSchema),
  });

  return (
    <Card className="min-h-screen w-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-2xl">Currency Exchange Rates</CardTitle>
        <CardDescription>
          Compare exchange rates for selected currencies over time
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <FormProvider {...methods}>
          <div className="flex flex-col gap-12">
            <FiltersForm />
            {methods.watch().currencies.length > 0 && <Chart />}
          </div>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
