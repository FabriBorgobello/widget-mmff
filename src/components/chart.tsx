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
          <Suspense
            fallback={
              <div className="aspect-video h-full w-full animate-pulse rounded-lg bg-gray-100"></div>
            }
          >
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
