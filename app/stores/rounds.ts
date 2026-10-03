import type { CrewMember } from '~/stores/crew'

export interface RoundSnapshot {
  roundNumber: number
  timestamp: number
  crewMembers: CrewMember[]
  roundNotes: string
  mapId?: string
  mapPositions?: Record<string, MapCoordinate>
}

export interface MapCoordinate {
  x: number
  y: number
}

export const MAX_ROUNDS = 10

export const useRoundsStore = defineStore(
  'rounds',
  () => {
    const currentRoundNumber = ref(1)
    const viewingRoundNumber = ref<number | null>(null)
    const roundHistory = ref<RoundSnapshot[]>([])
    // Positions are grouped by map and stored as fractions of the displayed map
    // dimensions. Legacy transform strings can remain in persisted storage, but
    // the typed readers below deliberately ignore them.
    const currentMapPositions = ref<Record<string, Record<string, MapCoordinate>>>({})

    const isViewingHistory = computed(() => viewingRoundNumber.value !== null)
    const isMaxRoundsReached = computed(() => currentRoundNumber.value >= MAX_ROUNDS)

    const activeSnapshot = computed(() => {
      if (viewingRoundNumber.value === null) return null
      return roundHistory.value.find((s) => s.roundNumber === viewingRoundNumber.value) || null
    })

    function getMapPositions(mapId: string): Record<string, MapCoordinate> {
      const stored = (currentMapPositions.value as Record<string, unknown> | null)?.[mapId]
      if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {}

      return Object.fromEntries(
        Object.entries(stored).filter((entry): entry is [string, MapCoordinate] => {
          const coordinate = entry[1] as Partial<MapCoordinate> | null
          return Boolean(
            coordinate &&
              typeof coordinate === 'object' &&
              Number.isFinite(coordinate.x) &&
              Number.isFinite(coordinate.y)
          )
        })
      )
    }

    function setMapPosition(mapId: string, color: string, coordinate: MapCoordinate) {
      if (!mapId || !Number.isFinite(coordinate.x) || !Number.isFinite(coordinate.y)) return

      const mapPositions = getMapPositions(mapId)
      mapPositions[color] = {
        x: Math.min(1, Math.max(0, coordinate.x)),
        y: Math.min(1, Math.max(0, coordinate.y)),
      }
      currentMapPositions.value = {
        ...(currentMapPositions.value as Record<string, Record<string, MapCoordinate>>),
        [mapId]: mapPositions,
      }
    }

    function clearMapPositions(mapId?: string) {
      if (!mapId) {
        currentMapPositions.value = {}
        return
      }

      const updated = { ...currentMapPositions.value }
      delete updated[mapId]
      currentMapPositions.value = updated
    }

    function archiveCurrentRound(currentCrewMembers: CrewMember[], roundNotes: string, mapId: string) {
      if (currentRoundNumber.value >= MAX_ROUNDS) return

      const snapshot: RoundSnapshot = {
        roundNumber: currentRoundNumber.value,
        timestamp: Date.now(),
        crewMembers: JSON.parse(JSON.stringify(currentCrewMembers)),
        roundNotes: roundNotes || '',
        mapId,
        mapPositions: JSON.parse(JSON.stringify(getMapPositions(mapId))),
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
      getMapPositions,
      setMapPosition,
      clearMapPositions,
      archiveCurrentRound,
      setViewingRound,
      startNewMatch,
    }
  },
  { persist: true }
)
