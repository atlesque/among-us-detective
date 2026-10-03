export const MATCH_ACTIVITY_KEY = 'among_us_detective_last_match_activity'
export const MATCH_CACHE_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

export function touchMatchActivity(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MATCH_ACTIVITY_KEY, Date.now().toString())
  } catch {}
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
    touchMatchActivity()
    return true
  }
  touchMatchActivity()
  return false
}
