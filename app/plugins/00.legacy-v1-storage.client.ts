import { migrateLegacyV1Storage } from '~/utils/legacyV1Storage'

// Runs before any persisted Pinia store hydrates (stores hydrate on first use).
export default defineNuxtPlugin(() => {
  try {
    migrateLegacyV1Storage(localStorage)
  } catch {
    // Storage blocked or full: V1 values simply load as before.
  }
})
