"use client";

import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { currencyCodeSchema } from "@/app/exchange_rates/schemas";
import { Filters } from "@/app/page";

import { MultiSelect } from "./multi-select";

async function getSymbols() {
  const res = await fetch("/symbols");
  return z
    .array(z.object({ id: currencyCodeSchema, name: z.string() }))
    .parse(await res.json());
}

export function Symbols() {
  const methods = useFormContext<Filters>();
  const { data, status, error } = useQuery({
    queryKey: ["symbols"],
    queryFn: () => getSymbols(),
  });

  if (status === "error")
    return (
      <div>
        Error:
        <pre>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </pre>
      </div>
    );

  return (
    <Controller
      control={methods.control}
      name="currencies"
      render={({ field }) => {
        return (
          <div className="flex max-w-full flex-col gap-1 md:w-[600px]">
            <label className="block text-sm font-medium text-gray-700">
              Currencies
            </label>
            <MultiSelect
              disabled={status === "pending"}
              onValueChange={field.onChange}
              options={
                data
                  ? data.map((symbol) => ({
                      value: symbol.id,
                      label: `${symbol.id} - ${symbol.name}`,
                    }))
                  : []
              }
            />
            {methods.formState.errors.currencies && (
              <div className="text-sm text-red-600">
                {methods.formState.errors.currencies.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
