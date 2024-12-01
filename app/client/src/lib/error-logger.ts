/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/nextjs";

export function logError(error: Error, context?: Record<string, any>) {
  // Add user context if available
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  Sentry.withScope((scope) => {
    // Add additional context
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }

    // Add user context
    if (user) {
      scope.setUser(JSON.parse(user));
    }

    // Set error level
    scope.setLevel("error");

    // Capture the error
    Sentry.captureException(error);
  });

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error);
    if (context) {
      console.error("Context:", context);
    }
  }
}
