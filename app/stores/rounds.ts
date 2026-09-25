import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CrewMember } from '~/stores/crew'

export interface RoundSnapshot {
  roundNumber: number
  timestamp: number
  crewMembers: CrewMember[]
  roundNotes: string
  mapPositions?: Record<string, string>
}

export const MAX_ROUNDS = 10

export const useRoundsStore = defineStore(
  'rounds',
  () => {
    const currentRoundNumber = ref(1)
    const viewingRoundNumber = ref<number | null>(null)
    const roundHistory = ref<RoundSnapshot[]>([])
    const currentMapPositions = ref<Record<string, string>>({})

    const isViewingHistory = computed(() => viewingRoundNumber.value !== null)
    const isMaxRoundsReached = computed(() => currentRoundNumber.value >= MAX_ROUNDS)

    const activeSnapshot = computed(() => {
      if (viewingRoundNumber.value === null) return null
      return roundHistory.value.find((s) => s.roundNumber === viewingRoundNumber.value) || null
    })

    function setMapPosition(color: string, transform: string) {
      currentMapPositions.value[color] = transform
    }

    function clearMapPositions() {
      currentMapPositions.value = {}
    }

    function archiveCurrentRound(currentCrewMembers: CrewMember[], roundNotes: string): boolean {
      if (currentRoundNumber.value >= MAX_ROUNDS) return false

      const snapshot: RoundSnapshot = {
        roundNumber: currentRoundNumber.value,
        timestamp: Date.now(),
        crewMembers: JSON.parse(JSON.stringify(currentCrewMembers)),
        roundNotes: roundNotes || '',
        mapPositions: JSON.parse(JSON.stringify(currentMapPositions.value)),
      }

      const existingIdx = roundHistory.value.findIndex(
        (s) => s.roundNumber === currentRoundNumber.value
      )
      if (existingIdx >= 0) {
        roundHistory.value[existingIdx] = snapshot
      } else {
        roundHistory.value.push(snapshot)
      }

      currentMapPositions.value = {}
      currentRoundNumber.value += 1
      viewingRoundNumber.value = null
      return true
    }

    function setViewingRound(roundNumber: number | null) {
      viewingRoundNumber.value = roundNumber
    }

    function startNewMatch() {
      currentRoundNumber.value = 1
      viewingRoundNumber.value = null
      roundHistory.value = []
      currentMapPositions.value = {}
    }

    return {
      currentRoundNumber,
      viewingRoundNumber,
      roundHistory,
      currentMapPositions,
      isViewingHistory,
      isMaxRoundsReached,
      activeSnapshot,
      setMapPosition,
      clearMapPositions,
      archiveCurrentRound,
      setViewingRound,
      startNewMatch,
    }
  },
  { persist: true }
)
