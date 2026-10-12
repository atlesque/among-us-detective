import { useImpostorStore } from '~/stores/impostor'
import { useTimerStore } from '~/stores/timer'
import { touchMatchActivity } from '~/utils/sessionManager'

/**
 * Single place that resets everything for a new match, so the top bar button,
 * the vote alert button and the 2-hour session expiry all behave the same.
 */
export function useNewMatch() {
  const roundsStore = useRoundsStore()
  const crewStore = useCrewStore()
  const tasksStore = useTasksStore()
  const timerStore = useTimerStore()
  const notesStore = useNotesStore()
  const impostorStore = useImpostorStore()
  const settingsStore = useSettingsStore()
  const { gtag } = useGtag()

  /** Clears all match state. Does not record activity or send analytics. */
  function resetMatchState() {
    roundsStore.startNewMatch()
    crewStore.resetAllCrew()
    tasksStore.resetAllTasks()
    timerStore.resetTimer()
    timerStore.resetStopwatch()
    if (settingsStore.resetNotesOnNewGame) notesStore.clearGameNotes()
    notesStore.clearRoundNotes()
    impostorStore.setImpostorMode(false)
    impostorStore.clearFellowImpostors()
  }

  /** A user-initiated new match (top bar or vote alert). */
  function startNewMatch() {
    resetMatchState()
    touchMatchActivity()
    gtag('event', 'init_new_match', { event_category: 'global_stats' })
  }

  return { resetMatchState, startNewMatch }
}
