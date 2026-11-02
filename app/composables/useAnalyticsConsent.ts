import { computed } from 'vue'

export type AnalyticsConsent = 'granted' | 'denied' | null

// Stored separately from the old "acceptedCookies" flag: that banner only had
// a "Got it" button, so it never recorded an actual choice.
const STORAGE_KEY = 'analyticsConsent'

function readStoredConsent(): AnalyticsConsent {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function useAnalyticsConsent() {
  const nuxtApp = useNuxtApp()
  const consent = useState<AnalyticsConsent>('analyticsConsent', () =>
    import.meta.client ? readStoredConsent() : null,
  )
  const { initialize, enableAnalytics, disableAnalytics } = useGtag()

  // Loads the Google tag script (a no-op when gtag is disabled outside production)
  function startAnalytics() {
    enableAnalytics()
    nuxtApp.runWithContext(() => initialize())
  }

  function setConsent(value: 'granted' | 'denied') {
    consent.value = value
    try {
      localStorage.setItem(STORAGE_KEY, value)
      localStorage.removeItem('acceptedCookies')
    } catch {}
    if (value === 'granted') startAnalytics()
    else disableAnalytics()
  }

  return {
    consent,
    hasChosen: computed(() => consent.value !== null),
    isGranted: computed(() => consent.value === 'granted'),
    startAnalytics,
    grant: () => setConsent('granted'),
    deny: () => setConsent('denied'),
  }
}
