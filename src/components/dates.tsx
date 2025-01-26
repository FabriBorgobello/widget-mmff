import React from "react";

import { format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Filters } from "@/app/page";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Dates() {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState({
    "dates.start_date": false,
    "dates.end_date": false,
  });
  const methods = useFormContext<Filters>();

  console.log(methods.formState.errors);
  return (
    <div className="flex flex-col justify-between gap-1">
      <div className="flex flex-col gap-4 lg:flex-row">
        {(["dates.start_date", "dates.end_date"] as const).map((name) => (
          <Controller
            key={name}
            control={methods.control}
            name={name}
            render={({ field }) => {
              const { value, onChange } = field;
              return (
                <div className="flex w-full flex-col gap-1 md:w-auto">
                  <label className="block text-sm font-medium text-gray-700">
                    {name === "dates.start_date" ? "Start Date" : "End Date"}
                  </label>
                  <Popover open={isCalendarOpen[name]}>
                    <PopoverTrigger asChild>
                      <Button
                        onClick={() => {
                          setIsCalendarOpen((prev) => ({
                            "dates.end_date": false,
                            "dates.start_date": false,
                            [name]: !prev[name],
                          }));
                        }}
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
                      <div className="flex justify-end">
                        <Button
                          size={"sm"}
                          variant={"ghost"}
                          onClick={() =>
                            setIsCalendarOpen({
                              "dates.end_date": false,
                              "dates.start_date": false,
                            })
                          }
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <Calendar
                        disabled={{
                          after: new Date(),
                          before: new Date("2022-01-01"),
                        }}
                        showOutsideDays={false}
                        mode="single"
                        selected={new Date(value)}
                        onSelect={(date) => {
                          onChange(date);
                          setIsCalendarOpen((prev) => ({
                            ...prev,
                            [name]: false,
                          }));
                        }}
                        classNames={{ cell: "w-[32px] text-center" }}
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
        <div className="text-sm text-red-600">
          {methods.formState.errors.dates.root.message}
        </div>
      )}
      {methods.formState.errors.dates?.start_date && (
        <div className="text-sm text-red-600">
          {methods.formState.errors.dates.start_date.message}
        </div>
      )}
      {methods.formState.errors.dates?.end_date && (
        <div className="text-sm text-red-600">
          {methods.formState.errors.dates.end_date.message}
        </div>
      )}
    </div>
  );
}
