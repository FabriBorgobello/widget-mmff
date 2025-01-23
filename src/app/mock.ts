import { eachDayOfInterval, format } from "date-fns";

// Mock function to generate random exchange rates
function generateRandomRate(base: number, variance: number): number {
  return base + (Math.random() - 0.5) * variance;
}

export async function fetchExchangeRates(
  currencies: string[],
  startDate: Date,
  endDate: Date,
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Generate mock data
  const rates: { [key: string]: { [key: string]: number } } = {};
  days.forEach((day) => {
    const dateString = format(day, "yyyy-MM-dd");
    rates[dateString] = {};
    currencies.forEach((currency) => {
      switch (currency) {
        case "USD":
          rates[dateString][currency] = 1; // Base currency
          break;
        case "EUR":
          rates[dateString][currency] = generateRandomRate(0.85, 0.02);
          break;
        case "GBP":
          rates[dateString][currency] = generateRandomRate(0.75, 0.02);
          break;
        case "JPY":
          rates[dateString][currency] = generateRandomRate(110, 2);
          break;
        case "AUD":
          rates[dateString][currency] = generateRandomRate(1.3, 0.03);
          break;
        case "CAD":
          rates[dateString][currency] = generateRandomRate(1.25, 0.03);
          break;
        case "CHF":
          rates[dateString][currency] = generateRandomRate(0.9, 0.02);
          break;
        case "CNY":
          rates[dateString][currency] = generateRandomRate(6.5, 0.1);
          break;
        case "SEK":
          rates[dateString][currency] = generateRandomRate(8.5, 0.1);
          break;
        case "NZD":
          rates[dateString][currency] = generateRandomRate(1.4, 0.03);
          break;
        case "ARS":
          rates[dateString][currency] = generateRandomRate(810, 10);
          break;
        case "BTC":
          rates[dateString][currency] = generateRandomRate(0.000022, 0.000001);
          break;
        default:
          rates[dateString][currency] = generateRandomRate(1, 0.05);
      }
    });
  });

  return {
    start_date: format(startDate, "yyyy-MM-dd"),
    end_date: format(endDate, "yyyy-MM-dd"),
    rates,
  };
}
