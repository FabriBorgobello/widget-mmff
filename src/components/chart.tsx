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
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
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
