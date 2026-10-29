import * as Sentry from "@sentry/nuxt";

// Fallback until a V2 project exists: V1's DSN (project 5713136). Set
// NUXT_PUBLIC_SENTRY_DSN in the build to send events somewhere else.
const FALLBACK_DSN = "https://37f1b1f8849a4412846b47957ee5299c@o568257.ingest.us.sentry.io/5713136";

// Tells events from the main domain, the v2 subdomain and preview deploys apart.
function environmentFor(hostname: string): string {
  if (hostname === "amongusdetective.com" || hostname === "www.amongusdetective.com") return "production";
  if (hostname === "v2.amongusdetective.com") return "v2-subdomain";
  return "preview";
}

const config = useRuntimeConfig();

Sentry.init({
  dsn: config.public.sentry.dsn || FALLBACK_DSN,

  environment: environmentFor(window.location.hostname),
  release: `among-us-detective@${config.public.appVersion}`,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0,

  // Session Replay disabled for privacy
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Disable sending of user PII (Personally Identifiable Information)
  sendDefaultPii: false,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
