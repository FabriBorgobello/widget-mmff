import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContent } from "./chart-content";
import { ChartFooter } from "./chart-footer";

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exchange Rate Trends Against the US Dollar</CardTitle>
        <CardDescription>
          Comparative Analysis of Currency Fluctuations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback="Loading...">
          <ChartContent />
        </Suspense>
      </CardContent>
      <CardFooter>
        <ChartFooter />
      </CardFooter>
    </Card>
  );
}
