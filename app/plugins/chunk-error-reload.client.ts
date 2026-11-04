// Reload the page once when a JavaScript chunk fails to load.
//
// Each deploy replaces the hashed files in /_nuxt/. A page that was loaded
// before the deploy (an open tab, a tab Safari restores, or HTML served from a
// cache) still asks for the old files, which now return 404. Safari reports
// that as "TypeError: Importing a module script failed." (Sentry
// AMONG-US-DETECTIVE-3H), Chromium as "Failed to fetch dynamically imported
// module". It breaks the page chunk while the app starts, and the lazy modals
// (Help, Settings, Maps, ...) when they are first opened.
//
// Nuxt's own handler (`emitRouteChunkError: "automatic"`) only reloads on the
// next route change, which never happens in this one-page app. Its
// "automatic-immediate" mode would also reload whenever a new build is
// detected, which would interrupt a match, so we handle chunk errors here.
//
// If the entry script itself fails, none of this code runs; an inline script
// in nuxt.config.ts handles that case with the same session key.
//
// Reloading is safe mid-match: every store is persisted to localStorage.
// A reload is attempted at most once every 30 seconds, so a chunk that keeps
// failing (offline, a broken deploy) can't cause a reload loop, and that
// failure still reaches Sentry.

const RELOAD_KEY = "aud:chunk-error-reload"
const RELOAD_GUARD_MS = 30_000

declare global {
  interface Window {
    /** Set when a chunk error triggered a reload; sentry.client.config.ts drops that error. */
    __audChunkReloadPending?: boolean
  }
}

export default defineNuxtPlugin({
  name: "chunk-error-reload",
  setup() {
    // Vite fires this event synchronously before the failed import rejects, so
    // the flag below is set before Sentry sees the error.
    window.addEventListener("vite:preloadError", () => {
      if (window.__audChunkReloadPending) return

      let lastReload = 0
      try {
        lastReload = Number(sessionStorage.getItem(RELOAD_KEY)) || 0
        if (Date.now() - lastReload < RELOAD_GUARD_MS) return
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
      } catch {
        // Without sessionStorage there is no loop guard, so don't reload.
        return
      }

      window.__audChunkReloadPending = true
      window.location.reload()
    })
  },
})
