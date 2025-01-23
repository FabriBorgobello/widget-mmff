import { db } from "../..";
import { ExchangeRateInsert, exchangeRates } from "../../schema/exchange_rates";

const rates: ExchangeRateInsert[] = [];

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
