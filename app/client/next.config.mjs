/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: "javascript-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false, 
});
