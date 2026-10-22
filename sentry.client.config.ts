import * as Sentry from "@sentry/nuxt";

Sentry.init({
  // If set up, you can use your runtime config here
  // dsn: useRuntimeConfig().public.sentry.dsn,
  dsn: "https://37f1b1f8849a4412846b47957ee5299c@o568257.ingest.us.sentry.io/5713136",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // No Session Replay: it records visitors' sessions, which needs consent.

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Don't send visitors' IP addresses or other PII with error reports.
  sendDefaultPii: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
