import { LEGACY_V1_MIGRATION_KEY, migrateLegacyV1Storage } from '~/utils/legacyV1Storage'

const V1_WORKER_SESSION_KEY = 'servedByV1Worker'

// Runs before any persisted Pinia store hydrates (stores hydrate on first use).
export default defineNuxtPlugin(() => {
  let servedByV1Worker = false
  try {
    // A service worker controls the page but V2 has never run on this origin:
    // V1's worker served this page, and V2's own worker is waiting behind it.
    // V1's worker keeps control until every tab is closed, so remember this for
    // reloads in the same tab.
    if (navigator.serviceWorker?.controller) {
      servedByV1Worker =
        !localStorage.getItem(LEGACY_V1_MIGRATION_KEY) ||
        sessionStorage.getItem(V1_WORKER_SESSION_KEY) === 'true'
      if (servedByV1Worker) sessionStorage.setItem(V1_WORKER_SESSION_KEY, 'true')
    }
    migrateLegacyV1Storage(localStorage)
  } catch {
    // Storage blocked or full: V1 values simply load as before.
  }
  return { provide: { servedByV1Worker } }
})
