"use client";

import { format } from "date-fns";
import { useFormContext, useWatch } from "react-hook-form";

import { Filters } from "@/app/page";

export function ChartFooter() {
  const methods = useFormContext<Filters>();
  const filters = useWatch<Filters>({ control: methods.control });

  return (
    <div className="flex w-full items-start gap-2 text-sm">
      <div className="grid gap-2">
        {filters.currencies && (
          <div className="flex items-center gap-2 font-medium leading-none">
            Displaying results for {filters.currencies.length}{" "}
            {filters.currencies.length > 1 ? "currencies" : "currency"}.
          </div>
        )}
        {filters.start_date && filters.end_date && (
          <div className="flex items-center gap-2 font-medium leading-none text-muted-foreground">
            {format(filters.start_date, "MMM dd, yyyy")} to{" "}
            {format(filters.end_date, "MMM dd, yyyy")}.
          </div>
        )}
      </div>
    </div>
  );
}
