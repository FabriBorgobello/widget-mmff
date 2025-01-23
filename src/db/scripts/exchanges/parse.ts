import fs from "node:fs";

import data from "./external.json";

type Rate = Record<string, number>;
type DayRates = Record<string, Rate>;

type ApiResponse = {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: DayRates;
};

type Insert = {
  baseCurrencyId: string;
  date: string;
  rate: string;
  targetCurrencyId: string;
};

const typed = data as ApiResponse;

function parseData(): Insert[] {
  const formatted = Object.entries(typed.rates).reduce(
    (acc, [date, dayRates]) => {
      const newRates = Object.entries(dayRates).map(
        ([targetCurrencyId, rate]) => ({
          baseCurrencyId: typed.base,
          date,
          rate: rate.toString(),
          targetCurrencyId,
        }),
      );
      return [...acc, ...newRates];
    },
    [] as Insert[],
  );
  return formatted;
}

const good = parseData();
fs.writeFileSync(
  "src/db/scripts/exchanges/output.json",
  JSON.stringify({ rates: good }, null, 2),
);
