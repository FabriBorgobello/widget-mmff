"use client";

import { SelectItem } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Filters } from "@/app/page";
import { currencyCodeSchema } from "@/app/types";
import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

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
      <>
        <Controller
          name="currencies"
          render={({ field }) => {
            return (
              <div className="min-w-[200px] flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Select Currencies
                </label>
                <Select
                  onValueChange={(value) => {
                    const selected = field.value as string[];
                    if (selected.includes(value)) {
                      field.onChange(selected.filter((v) => v !== value));
                    } else {
                      field.onChange([...selected, value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((currency) => (
                      <SelectItem
                        key={currency.id}
                        value={currency.id}
                        className={cn(
                          field.value.includes(currency.id) &&
                            "bg-red-100 text-red-500",
                        )}
                      >
                        {currency.id} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }}
        />
        <ul>
          {methods.watch("currencies").map((currency) => (
            <li key={currency}>{currency}</li>
          ))}
        </ul>
      </>
    );
  }

  status satisfies never;
}
