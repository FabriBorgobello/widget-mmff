"use client";

import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Filters } from "@/app/page";
import { currencyCodeSchema } from "@/app/types";

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
  if (status === "pending") return <div>Loading...</div>;

  if (status === "success") {
    return (
      <Controller
        control={methods.control}
        name="currencies"
        render={({ field }) => {
          return (
            <div className="flex w-full flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Currencies
              </label>
              <MultiSelect
                onValueChange={field.onChange}
                options={data.map((symbol) => ({
                  value: symbol.id,
                  label: `${symbol.id} - ${symbol.name}`,
                }))}
              />
            </div>
          );
        }}
      />
    );
  }

  status satisfies never;
}
