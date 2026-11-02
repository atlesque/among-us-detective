// Google Analytics runs in manual init mode (see nuxt.config.ts) and only
// loads once the player has allowed it.
export default defineNuxtPlugin(() => {
  const { isGranted, startAnalytics } = useAnalyticsConsent()
  if (isGranted.value) startAnalytics()
})
