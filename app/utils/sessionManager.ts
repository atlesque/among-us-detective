export const MATCH_ACTIVITY_KEY = 'among_us_detective_last_match_activity'
export const MATCH_CACHE_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

let touchTimeout: ReturnType<typeof setTimeout> | null = null
let lastTouchTimestamp = 0
const ACTIVITY_THROTTLE_WINDOW_MS = 1500

function writeActivityTimestamp(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MATCH_ACTIVITY_KEY, Date.now().toString())
  } catch {}
  lastTouchTimestamp = Date.now()
  if (touchTimeout !== null) {
    clearTimeout(touchTimeout)
    touchTimeout = null
  }
}

export function touchMatchActivity(immediate = false): void {
  if (typeof window === 'undefined') return

  if (immediate) {
    writeActivityTimestamp()
    return
  }

  const now = Date.now()
  if (now - lastTouchTimestamp > ACTIVITY_THROTTLE_WINDOW_MS) {
    writeActivityTimestamp()
  } else if (!touchTimeout) {
    touchTimeout = setTimeout(writeActivityTimestamp, ACTIVITY_THROTTLE_WINDOW_MS)
  }
}

export function getLastMatchActivity(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(MATCH_ACTIVITY_KEY)
    return raw ? Number(raw) || 0 : 0
  } catch {
    return 0
  }
}

export function isMatchSessionExpired(): boolean {
  const lastActive = getLastMatchActivity()
  if (!lastActive) return false
  const elapsed = Date.now() - lastActive
  return elapsed > MATCH_CACHE_TTL_MS
}

export function checkAndExpireMatchSession(stores: {
  crewStore: any
  roundsStore: any
  notesStore: any
  tasksStore: any
  impostorStore: any
}): boolean {
  if (isMatchSessionExpired()) {
    stores.roundsStore?.startNewMatch?.()
    stores.crewStore?.resetAllCrew?.()
    stores.notesStore?.clearRoundNotes?.()
    stores.notesStore?.clearGameNotes?.()
    stores.tasksStore?.resetAllTasks?.()
    stores.impostorStore?.clearFellowImpostors?.()
    stores.impostorStore?.setImpostorMode?.(false)
    touchMatchActivity(true)
    return true
  }
  touchMatchActivity()
  return false
}
