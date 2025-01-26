import { useFormContext } from "react-hook-form";

import { Filters } from "@/app/page";

import { Dates } from "./dates";
import { Symbols } from "./symbols";
import { Button } from "./ui/button";

export function FiltersForm() {
  const methods = useFormContext<Filters>();

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Dates />
      <Symbols />
      <Button
        type="submit"
        size={"lg"}
        className="mt-4 md:mt-6"
        disabled={methods.formState.isSubmitting}
      >
        Search
      </Button>
    </div>
  );
}
