// V1 (amongusdetective.com) persisted its settings under the same localStorage
// keys V2 uses. When V2 is served from the V1 origin, those values would load
// straight into V2, so this one-time migration keeps what still makes sense and
// drops the rest.

export const LEGACY_V1_MIGRATION_KEY = 'legacyV1StorageMigrated'

// Every key V1's settings store ever persisted. A saved settings blob holding
// nothing outside this set was written by V1, not V2.
const V1_SETTINGS_KEYS = new Set([
  'showColorNames',
  'showImposterCheckbox',
  'showTasksCheckbox',
  'showMeetingsCount',
  'showPlayerNames',
  'settingsModalOpenState',
  'resetNotesOnNewGame',
  'showRoundNotes',
  'canTrackOwnColor',
  'isImproveMapContrastEnabled',
])

// Dropped from V1 settings:
// - showColorNames: V1 defaulted it to false and saved that default for every
//   user, so it can't be told apart from a real choice. V2 shows names by default.
// - The three visibility toggles were removed from V2 and are never read.
// - settingsModalOpenState: never reopen the settings modal on first V2 load.
const DROPPED_V1_SETTINGS = [
  'showColorNames',
  'showImposterCheckbox',
  'showTasksCheckbox',
  'showMeetingsCount',
  'settingsModalOpenState',
]

// Keys only V1 ever wrote. 'vuex' is the settings blob of the pre-Nuxt V1.
const V1_ONLY_KEYS = ['seenV2Announcement', 'vuex']

function readJsonObject(storage: Storage, key: string): Record<string, unknown> | null {
  const raw = storage.getItem(key)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function migrateLegacyV1Storage(storage: Storage): void {
  if (storage.getItem(LEGACY_V1_MIGRATION_KEY)) return

  const settings = readJsonObject(storage, 'settings')
  const hasV1Settings =
    settings !== null &&
    Object.keys(settings).length > 0 &&
    Object.keys(settings).every((key) => V1_SETTINGS_KEYS.has(key))
  const hasV1Keys = V1_ONLY_KEYS.some((key) => storage.getItem(key) !== null)

  if (settings && hasV1Settings) {
    for (const key of DROPPED_V1_SETTINGS) delete settings[key]
    storage.setItem('settings', JSON.stringify(settings))
  }

  if (hasV1Settings || hasV1Keys) {
    // V1 players haven't seen V2's interface yet, so show its help once.
    storage.removeItem('returningPlayer')
    for (const key of V1_ONLY_KEYS) storage.removeItem(key)
  }

  storage.setItem(LEGACY_V1_MIGRATION_KEY, 'true')
}
