/* eslint-disable drizzle/enforce-delete-with-where */
import { db } from "..";
import { exchangeRates } from "../schema/exchange_rates";
import { symbols } from "../schema/symbols";

async function main() {
  await db.delete(exchangeRates);
  console.log("All exchange rates deleted");

  await db.delete(symbols);
  console.log("All symbols deleted");
}

main();
