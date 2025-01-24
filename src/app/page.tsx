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

const filtersSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  currencies: z.array(z.string()),
});

export type Filters = z.infer<typeof filtersSchema>;

const FILTERS_DEFAULTS: Filters = {
  start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  end_date: new Date(),
  currencies: ["USD", "EUR"],
};

export default function Home() {
  const methods = useForm<Filters>({
    defaultValues: FILTERS_DEFAULTS,
    resolver: zodResolver(filtersSchema),
  });

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Currency Exchange Rates</CardTitle>
        <CardDescription>
          Compare exchange rates for selected currencies over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <div className="flex flex-col gap-12">
            <FiltersForm />
            <Chart />
          </div>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
