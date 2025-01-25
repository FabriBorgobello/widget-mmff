import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

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
        <ErrorBoundary
          FallbackComponent={(props) => (
            <div>
              Error
              <pre>{props.error.message}</pre>
            </div>
          )}
        >
          <Suspense fallback="Loading...">
            <ChartContent />
          </Suspense>
        </ErrorBoundary>
      </CardContent>
      <CardFooter>
        <ChartFooter />
      </CardFooter>
    </Card>
  );
}
