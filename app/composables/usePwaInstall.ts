import { ref, computed } from 'vue'

const isInstallPromptVisible = ref(false)
const isAppInstalled = ref(false)
const isStandalone = ref(false)
const hasDismissed = ref(false)
let pwaInstallEvent: any = null
let isInitialized = false

export function usePwaInstall() {
  if (typeof window !== 'undefined' && !isInitialized) {
    isInitialized = true
    initPwaState()
  }

  const canInstall = computed(() => {
    return !isStandalone.value && !isAppInstalled.value
  })

  function initPwaState() {
    if (typeof window === 'undefined') return

    const isStandaloneMode = (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    )
    isStandalone.value = isStandaloneMode

    // Clean up any stale legacy flag from localStorage
    try {
      localStorage.removeItem('isAppInstalled')
      hasDismissed.value = localStorage.getItem('appInstallationDismissed') === 'true'
    } catch {
      // Graceful fallback
    }

    // In standalone mode, the app is actively running as an installed PWA.
    // In normal browser tabs, default to false unless verified by getInstalledRelatedApps.
    isAppInstalled.value = isStandaloneMode

    if (!isStandaloneMode && typeof navigator !== 'undefined' && 'getInstalledRelatedApps' in navigator) {
      try {
        (navigator as any).getInstalledRelatedApps().then((relatedApps: any[]) => {
          if (Array.isArray(relatedApps) && relatedApps.length > 0) {
            isAppInstalled.value = true
          } else if (!isStandalone.value) {
            isAppInstalled.value = false
          }
        }).catch(() => {})
      } catch {}
    }

    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault()
      pwaInstallEvent = event
      // When beforeinstallprompt fires, the app is definitely not installed
      isAppInstalled.value = false

      // Only show banner automatically on first visit if user hasn't dismissed and not in standalone
      if (!hasDismissed.value && !isStandalone.value) {
        isInstallPromptVisible.value = true
      }
    })

    window.addEventListener('appinstalled', () => {
      isAppInstalled.value = true
      isInstallPromptVisible.value = false
      pwaInstallEvent = null
      try {
        localStorage.setItem('appInstallationDismissed', 'true')
      } catch {}
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'pwa_installed', {
          event_category: 'engagement',
          event_label: 'Among Us Detective App Installed',
        })
      }
    })
  }

  function promptInstall() {
    isInstallPromptVisible.value = false

    if (pwaInstallEvent != null) {
      try {
        pwaInstallEvent.prompt()
        pwaInstallEvent.userChoice?.then((choiceResult: any) => {
          if (choiceResult?.outcome === 'accepted') {
            isAppInstalled.value = true
            try {
              localStorage.setItem('appInstallationDismissed', 'true')
            } catch {}
            if (typeof (window as any).gtag === 'function') {
              (window as any).gtag('event', 'pwa_installed', {
                event_category: 'engagement',
                event_label: 'User Accepted PWA Install',
              })
            }
          }
          pwaInstallEvent = null
        }).catch(() => {
          pwaInstallEvent = null
        })
      } catch (err) {
        console.warn('PWA prompt failed:', err)
      }
    }
  }

  function dismissPrompt() {
    isInstallPromptVisible.value = false
    hasDismissed.value = true
    try {
      localStorage.setItem('appInstallationDismissed', 'true')
    } catch {}
  }

  return {
    isInstallPromptVisible,
    isAppInstalled,
    isStandalone,
    hasDismissed,
    canInstall,
    promptInstall,
    dismissPrompt,
  }
}
