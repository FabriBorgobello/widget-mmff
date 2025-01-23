import { db } from "@/db";

import rates2021 from "./2021.json";
import rates2022 from "./2022.json";
import rates2023 from "./2023.json";
import rates2024 from "./2024.json";
import rates2025 from "./2025.json";
import { ExchangeRateInsert, exchangeRates } from "../../schema/exchange_rates";

const typed2021 = rates2021 as { rates: ExchangeRateInsert[] };
const typed2022 = rates2022 as { rates: ExchangeRateInsert[] };
const typed2023 = rates2023 as { rates: ExchangeRateInsert[] };
const typed2024 = rates2024 as { rates: ExchangeRateInsert[] };
const typed2025 = rates2025 as { rates: ExchangeRateInsert[] };

const rates: ExchangeRateInsert[] = [
  ...typed2021.rates,
  ...typed2022.rates,
  ...typed2023.rates,
  ...typed2024.rates,
  ...typed2025.rates,
];

// Read JSON file and process it
const processJson = async () => {
  try {
    // Insert data into the database in batches
    const batchSize = 1000;
    for (let i = 0; i < rates.length; i += batchSize) {
      const batch = rates.slice(i, i + batchSize);
      await db.insert(exchangeRates).values(batch);
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error processing JSON:", error);
  }
};

// Run the script
processJson();
