import { useFormContext, useWatch } from "react-hook-form";

import { Filters } from "@/app/page";

export function Chart() {
  const methods = useFormContext<Filters>();
  const data = useWatch({ control: methods.control });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
