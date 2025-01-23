import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Filters } from "@/app/page";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function FiltersForm() {
  const methods = useFormContext<Filters>();

  async function onSubmit(data: Filters) {
    console.log(data);
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {/* Currencies */}
      {/* Dates */}
      <div className="flex gap-4">
        {(["start_date", "end_date"] as const).map((name) => (
          <Controller
            key={name}
            control={methods.control}
            name={name}
            render={({ field }) => {
              const { value, onChange } = field;
              return (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {name === "start_date" ? "Start Date" : "End Date"}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
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
                        selected={value}
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
    </form>
  );
}
