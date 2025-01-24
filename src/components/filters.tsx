import { useFormContext } from "react-hook-form";

import { Filters } from "@/app/page";

import { Dates } from "./dates";
import { Symbols } from "./symbols";

export function FiltersForm() {
  const methods = useFormContext<Filters>();

  async function onSubmit(data: Filters) {
    console.log(data);
  }

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:flex-row"
    >
      <Dates />
      <Symbols />
    </form>
  );
}
