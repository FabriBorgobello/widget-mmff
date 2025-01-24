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
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {(["start_date", "end_date"] as const).map((name) => (
        <Controller
          key={name}
          control={methods.control}
          name={name}
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <div className="w-full md:w-auto">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {name === "start_date" ? "Start Date" : "End Date"}
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
                      onSelect={(date) => {
                        onChange(date ? format(date, "yyyy-MM-dd") : undefined);
                      }}
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
  );
}
