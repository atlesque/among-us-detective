<template>
  <Transition name="banner-slide">
    <div
      v-if="shouldShowHud && currentAlert"
      class="critical-vote-alert w-full mb-2 min-h-[30px] sm:min-h-[32px] py-1 sm:py-0.5 px-2.5 sm:px-3 rounded-md border flex items-center justify-between gap-2 transition-all shadow-xs"
      :class="alertClasses"
      data-test="critical-vote-alert"
      role="alert"
    >
      <!-- Left: Badge + Aligned Context Text -->
      <div class="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 flex-wrap sm:flex-nowrap">
        <!-- Tactical Badge Pill -->
        <div
          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider shrink-0 leading-none shadow-2xs"
          :class="badgeClasses"
        >
          <span
            class="w-1.5 h-1.5 rounded-full shrink-0"
            :class="alertType === 'contradiction' ? 'bg-black animate-pulse' : alertType === 'critical' || alertType === 'defeat' ? 'bg-white animate-pulse' : 'bg-white'"
          />
          <span class="leading-none">{{ currentAlert.title }}</span>
          <span class="opacity-80 font-mono text-[9px] leading-none">({{ ratioText }})</span>
        </div>

        <!-- Description (Wraps naturally on small screens, never truncated!) -->
        <span
          class="text-[11px] sm:text-xs font-semibold leading-tight sm:leading-none break-words min-w-0"
          :class="textClasses"
          :title="currentAlert.description"
        >
          {{ currentAlert.description }}
        </span>
      </div>

      <!-- Right: Action (New Match on Defeat / Victory) -->
      <div v-if="alertType === 'defeat' || alertType === 'victory'" class="flex items-center gap-1 shrink-0">
        <button
          type="button"
          class="h-5 px-1.5 rounded text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white border-white/30 active:scale-95 leading-none"
          @click="initNewMatch"
        >
          <AppIcon name="refresh" class="w-3 h-3 shrink-0" />
          <span>{{ t('header.newMatch') }}</span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { isImpostorRole } from '~/stores/crew'
import { touchMatchActivity } from '~/utils/sessionManager'

const { t } = useI18n()
const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const roundsStore = useRoundsStore()
const tasksStore = useTasksStore()
const notesStore = useNotesStore()
const impostorStore = useImpostorStore()

// Total active in-game players who are alive
const activeAliveCount = computed(() => {
  return crewStore.crewMembers.filter(
    (m) => m.isActive && !m.isDead && m.status !== 'dead'
  ).length
})

// Confirmed dead impostors (uses single shared getter in crewStore)
const deadImpostorsCount = computed(() => {
  return crewStore.confirmedDeadImpostorsCount
})

// Total confirmed impostors identified in the match (dead or alive)
const totalConfirmedImpostorsCount = computed(() => {
  let count = 0
  const isImpMode = impostorStore.isImpostorModeActive

  // 1. ME: In Impostor Mode, ME is always an impostor
  const me = crewStore.playerCrewMember
  if (me && me.isActive) {
    if (isImpMode || (isImpostorRole(me.role) && me.roleConfirmed)) {
      count++
    }
  }

  // 2. All other active players who are confirmed impostors
  for (const m of crewStore.crewMembers) {
    if (!m.isActive || m.color === crewStore.playerColor) continue
    const isConfirmed =
      (isImpostorRole(m.role) && m.roleConfirmed) ||
      (isImpMode && impostorStore.isFellowImpostor(m.color))
    if (isConfirmed) {
      count++
    }
  }

  return count
})

// Remaining active impostors estimated for the match
const remainingImpostors = computed(() => {
  return Math.max(0, settingsStore.matchImpostorsCount - deadImpostorsCount.value)
})

// Alive crewmates count
const aliveCrewCount = computed(() => {
  return Math.max(0, activeAliveCount.value - remainingImpostors.value)
})

type AlertType = 'contradiction' | 'defeat' | 'victory' | 'critical' | 'info' | 'normal'

const alertType = computed<AlertType>(() => {
  if (activeAliveCount.value <= 0) return 'normal'

  // Contradiction: more confirmed impostors than the match setting allows!
  if (totalConfirmedImpostorsCount.value > settingsStore.matchImpostorsCount) {
    return 'contradiction'
  }

  // Victory: all impostors confirmed dead
  if (remainingImpostors.value === 0) {
    return 'victory'
  }

  // Defeat (Game Over): alive crewmates <= remaining impostors (e.g. 2x2, 1x1, 3x3)
  if (aliveCrewCount.value <= remainingImpostors.value && remainingImpostors.value > 0) {
    return 'defeat'
  }

  const alive = activeAliveCount.value
  const imps = remainingImpostors.value

  // Critical double kill / match point / triple kill / 3-player final
  if (
    (imps === 2 && (alive === 6 || alive === 5)) ||
    (imps === 3 && (alive === 9 || alive === 8 || alive === 7)) ||
    (imps === 1 && alive === 3)
  ) {
    return 'critical'
  }

  // Safe Skip cushions (5x2, 3x1, or 7x3)
  if ((imps === 2 && alive === 7) || (imps === 1 && alive === 4) || (imps === 3 && alive === 10)) {
    return 'info'
  }

  return 'normal'
})

// Ratio text in competitive Among Us format: Crew x Impostors (e.g. 5x2, 4x2, 3x1, 2x1, 2x2)
const ratioText = computed(() => {
  if (alertType.value === 'contradiction') {
    return `${totalConfirmedImpostorsCount.value}/${settingsStore.matchImpostorsCount}`
  }
  return `${aliveCrewCount.value}x${remainingImpostors.value}`
})

// Controls HUD visibility: Skip recommendations, danger alerts, and game-over states appear when HUD is enabled
const shouldShowHud = computed(() => {
  if (!settingsStore.showQuorumAlert) {
    return false
  }

  // Contradiction, Defeat and Victory are always shown if HUD is active
  if (alertType.value === 'contradiction' || alertType.value === 'defeat' || alertType.value === 'victory') {
    return true
  }

  // Critical alerts (Double Kill, Match Point, etc.) and Safe Skip (5x2, 3x1) appear when HUD is active
  if (alertType.value === 'critical' || alertType.value === 'info') {
    return true
  }

  // Normal rounds without critical vote decisions remain clean (no continuous in-match bar)
  return false
})

interface CurrentAlertData {
  title: string
  description: string
}

const currentAlert = computed<CurrentAlertData | null>(() => {
  if (roundsStore.isViewingHistory || activeAliveCount.value <= 0) {
    return null
  }

  const alive = activeAliveCount.value
  const imps = remainingImpostors.value
  const crew = aliveCrewCount.value

  const isImpMode = impostorStore.isImpostorModeActive

  // 0. CONTRADICTION (Highest Priority Invariant Check)
  if (alertType.value === 'contradiction') {
    return {
      title: t('quorum.contradictionTitle', {
        confirmed: totalConfirmedImpostorsCount.value,
        max: settingsStore.matchImpostorsCount,
      }),
      description: t('quorum.contradictionDesc', {
        confirmed: totalConfirmedImpostorsCount.value,
        max: settingsStore.matchImpostorsCount,
      }),
    }
  }

  // 1. DEFEAT / VICTORY (Inverted for Impostor mode: parity = Impostor win; dead imps = Impostor loss)
  if (alertType.value === 'defeat') {
    return {
      title: isImpMode ? t('quorum.imp.victoryTitle') : t('quorum.defeatTitle'),
      description: isImpMode ? t('quorum.imp.victoryDesc', { crew, imps }) : t('quorum.defeatDesc', { crew, imps }),
    }
  }

  if (alertType.value === 'victory') {
    return {
      title: isImpMode ? t('quorum.imp.defeatTitle') : t('quorum.victoryTitle'),
      description: isImpMode ? t('quorum.imp.defeatDesc') : t('quorum.victoryDesc'),
    }
  }

  // 3. CRITICAL SCENARIOS
  if (imps === 2 && alive === 6) {
    return {
      title: isImpMode ? t('quorum.imp.doubleKillTitle') : t('quorum.doubleKillTitle'),
      description: isImpMode ? t('quorum.imp.doubleKillDesc') : t('quorum.doubleKillDesc'),
    }
  }

  if (imps === 2 && alive === 5) {
    return {
      title: isImpMode ? t('quorum.imp.matchPoint2ImpsTitle') : t('quorum.matchPoint2ImpsTitle'),
      description: isImpMode ? t('quorum.imp.matchPoint2ImpsDesc') : t('quorum.matchPoint2ImpsDesc'),
    }
  }

  if (imps === 3 && alive === 7) {
    return {
      title: isImpMode ? t('quorum.imp.matchPoint3ImpsTitle') : t('quorum.matchPoint3ImpsTitle'),
      description: isImpMode ? t('quorum.imp.matchPoint3ImpsDesc') : t('quorum.matchPoint3ImpsDesc'),
    }
  }

  if (imps === 3 && (alive === 9 || alive === 8)) {
    return {
      title: isImpMode ? t('quorum.imp.tripleKillTitle') : t('quorum.tripleKillTitle'),
      description: isImpMode ? t('quorum.imp.tripleKillDesc') : t('quorum.tripleKillDesc'),
    }
  }

  if (imps === 1 && alive === 3) {
    return {
      title: isImpMode ? t('quorum.imp.final3Title') : t('quorum.final3Title'),
      description: isImpMode ? t('quorum.imp.final3Desc') : t('quorum.final3Desc'),
    }
  }

  // 4. SAFE SKIP (Crew) vs SETUP VOTE KILL (Impostor)
  if (imps === 3 && alive === 10) {
    return {
      title: isImpMode ? t('quorum.imp.voteKill10Title') : t('quorum.safeSkip10Title'),
      description: isImpMode ? t('quorum.imp.voteKill10Desc') : t('quorum.safeSkip10Desc'),
    }
  }

  if (imps === 2 && alive === 7) {
    return {
      title: isImpMode ? t('quorum.imp.voteKill7Title') : t('quorum.safeSkip7Title'),
      description: isImpMode ? t('quorum.imp.voteKill7Desc') : t('quorum.safeSkip7Desc'),
    }
  }

  if (imps === 1 && alive === 4) {
    return {
      title: isImpMode ? t('quorum.imp.voteKill4Title') : t('quorum.safeSkip4Title'),
      description: isImpMode ? t('quorum.imp.voteKill4Desc') : t('quorum.safeSkip4Desc'),
    }
  }

  // 5. STANDARD LIVE MATCH HUD
  return {
    title: t('quorum.normalTitle'),
    description: t('quorum.normalDesc', { crew, imps }),
  }
})

// Styling classes based on current alert state and active mode
const alertClasses = computed(() => {
  const isImpMode = impostorStore.isImpostorModeActive

  switch (alertType.value) {
    case 'contradiction':
      return 'bg-amber-950/90 border-amber-500 text-amber-100 shadow-md shadow-amber-950/40 ring-1 ring-amber-500/50'
    case 'defeat':
      // Crew defeat is Impostor Victory!
      return isImpMode
        ? 'bg-emerald-950/90 border-emerald-500 text-white shadow-md shadow-emerald-950/40'
        : 'bg-red-950/90 border-red-500 text-white shadow-md shadow-red-950/40'
    case 'victory':
      // Crew victory is Impostor Defeat!
      return isImpMode
        ? 'bg-red-950/90 border-red-500 text-white shadow-md shadow-red-950/40'
        : 'bg-emerald-950/90 border-emerald-500 text-white shadow-md shadow-emerald-950/40'
    case 'critical':
      return isImpMode
        ? 'bg-purple-950/40 border-purple-600/70 text-purple-200 dark:bg-purple-950/50 dark:border-purple-600/60 shadow-xs'
        : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/60 text-rose-950 dark:text-rose-100'
    case 'info':
      return isImpMode
        ? 'bg-amber-950/40 border-amber-600/70 text-amber-200 dark:bg-amber-950/50 dark:border-amber-600/60 shadow-xs'
        : 'bg-sky-50/90 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800/60 text-sky-950 dark:text-sky-100'
    case 'normal':
    default:
      return 'bg-gray-100/90 dark:bg-gray-900/60 border-gray-300/80 dark:border-gray-800/80 text-gray-800 dark:text-gray-200'
  }
})

const badgeClasses = computed(() => {
  const isImpMode = impostorStore.isImpostorModeActive

  switch (alertType.value) {
    case 'contradiction':
      return 'bg-amber-500 text-black font-black animate-pulse'
    case 'defeat':
      return isImpMode ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white animate-pulse'
    case 'victory':
      return isImpMode ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'
    case 'critical':
      return isImpMode ? 'bg-purple-600 text-white animate-pulse' : 'bg-rose-600 text-white'
    case 'info':
      return isImpMode ? 'bg-amber-600 text-white' : 'bg-sky-600 text-white'
    case 'normal':
    default:
      return 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
  }
})

const textClasses = computed(() => {
  const isImpMode = impostorStore.isImpostorModeActive

  switch (alertType.value) {
    case 'contradiction':
      return 'text-amber-100 font-semibold'
    case 'defeat':
    case 'victory':
      return 'text-white'
    case 'critical':
      return isImpMode ? 'text-purple-100' : 'text-rose-950 dark:text-rose-100'
    case 'info':
      return isImpMode ? 'text-amber-100' : 'text-sky-950 dark:text-sky-100'
    case 'normal':
    default:
      return 'text-gray-700 dark:text-gray-300'
  }
})

function initNewMatch() {
  roundsStore.startNewMatch()
  crewStore.resetAllCrew()
  tasksStore.resetAllTasks()
  if (settingsStore.resetNotesOnNewGame) notesStore.clearGameNotes()
  notesStore.clearRoundNotes()
  impostorStore.setImpostorMode(false)
  impostorStore.clearFellowImpostors()
  touchMatchActivity()
}
</script>

<style scoped>
.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.banner-slide-enter-from,
.banner-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
