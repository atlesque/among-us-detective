import * as Sentry from "@sentry/nuxt";
 
// The site is a static SPA (ssr: false), so this only runs in `nuxt preview`
// or the SSR build. Same DSN rule as sentry.client.config.ts.
Sentry.init({
  dsn:
    process.env.NUXT_PUBLIC_SENTRY_DSN ||
    "https://37f1b1f8849a4412846b47957ee5299c@o568257.ingest.us.sentry.io/5713136",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Disable sending of user PII (Personally Identifiable Information)
  sendDefaultPii: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
