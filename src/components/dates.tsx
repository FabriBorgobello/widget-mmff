import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Filters } from "@/app/page";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Dates() {
  const methods = useFormContext<Filters>();

  console.log(methods.formState.errors);
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {(["dates.start_date", "dates.end_date"] as const).map((name) => (
          <Controller
            key={name}
            control={methods.control}
            name={name}
            render={({ field }) => {
              const { value, onChange } = field;
              return (
                <div className="w-full md:w-auto">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {name === "dates.start_date" ? "Start Date" : "End Date"}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start pl-3 text-left font-normal md:w-auto",
                          !value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2" />
                        {value ? (
                          format(value, "MMM dd, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(value)}
                        onSelect={onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }}
          />
        ))}
      </div>
      {methods.formState.errors.dates?.root && (
        <div className="mt-1 text-sm text-red-600">
          {methods.formState.errors.dates.root.message}
        </div>
      )}
      {methods.formState.errors.dates?.start_date && (
        <div className="mt-1 text-sm text-red-600">
          {methods.formState.errors.dates.start_date.message}
        </div>
      )}
      {methods.formState.errors.dates?.end_date && (
        <div className="mt-1 text-sm text-red-600">
          {methods.formState.errors.dates.end_date.message}
        </div>
      )}
    </div>
  );
}
