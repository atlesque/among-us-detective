<template>
  <div
    class="flex flex-col p-2 pb-20 sm:pb-24 lg:p-8 lg:pb-24 transition-colors duration-300 min-h-screen text-gray-900 dark:text-gray-100 w-full max-w-full overflow-x-hidden"
    :class="impostorStore.isImpostorModeActive
      ? 'bg-gradient-to-b from-rose-100 via-slate-100 to-slate-100 dark:from-rose-950/40 dark:via-gray-950 dark:to-gray-950'
      : 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-100 dark:from-gray-900/40 dark:via-gray-950 dark:to-gray-950'"
  >
    <!-- Header Action Controls -->
    <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 w-full max-w-full">
      <!-- Left: Round Timeline Selector -->
      <div
        class="flex items-center gap-1 p-1 rounded-lg border shadow-inner overflow-x-auto min-w-0 max-w-full transition-colors"
        :class="impostorStore.isImpostorModeActive
          ? 'bg-rose-950/30 border-rose-900/40'
          : 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 shadow-xs'"
      >
        <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1.5 shrink-0 flex items-center gap-1">
          <AppIcon name="clock" class="w-3.5 h-3.5 shrink-0" />
          <span class="hidden md:inline">{{ t('header.timeline') }}</span>
        </span>
        <button
          v-for="s in roundsStore.roundHistory"
          :key="s.roundNumber"
          type="button"
          class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-bold rounded-md transition-colors shrink-0"
          :class="roundsStore.viewingRoundNumber === s.roundNumber
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-800'"
          @click="roundsStore.setViewingRound(s.roundNumber)"
        >
          R{{ s.roundNumber }}
        </button>

        <button
          type="button"
          class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-bold rounded-md transition-colors flex items-center gap-1 shrink-0"
          :class="!roundsStore.isViewingHistory
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'text-gray-700 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-200/80 dark:hover:bg-gray-800'"
          @click="roundsStore.setViewingRound(null)"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>R{{ roundsStore.currentRoundNumber }}</span>
          <span class="text-[10px] opacity-80 hidden sm:inline">({{ t('header.live') }})</span>
        </button>
      </div>

      <!-- Right: Meeting / Match Controls -->
      <div class="flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <!-- Next Round Button & Info Hint -->
        <div class="relative flex items-center gap-1.5 flex-1 sm:flex-initial">
          <!-- Discreet Info (i) Hint Button & Popover on the Left -->
          <div class="relative inline-flex items-center">
            <button
              type="button"
              class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all shrink-0 cursor-pointer"
              :class="isNextRoundInfoOpen || isNextRoundInfoHover
                ? 'bg-amber-500/25 text-amber-600 dark:text-amber-300 border border-amber-400/60 shadow-sm'
                : 'bg-gray-200/80 dark:bg-gray-800/60 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-700/60'"
              :title="t('header.nextRoundHint')"
              :aria-label="t('header.nextRoundHint')"
              data-test="next-round-info-btn"
              @mouseenter="isNextRoundInfoHover = true"
              @mouseleave="isNextRoundInfoHover = false"
              @click="isNextRoundInfoOpen = !isNextRoundInfoOpen"
            >
              i
            </button>

            <!-- Floating Tooltip / Popover -->
            <transition name="fade">
              <div
                v-if="isNextRoundInfoOpen || isNextRoundInfoHover"
                class="absolute top-full mt-2 left-0 z-50 w-56 sm:w-64 p-2.5 text-xs text-gray-700 dark:text-gray-200 bg-white/95 dark:bg-gray-900/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md text-left"
              >
                <div class="flex items-center justify-between gap-1.5 font-bold mb-1 text-amber-400 text-[11px]">
                  <div class="flex items-center gap-1">
                    <AppIcon name="alert" class="w-3.5 h-3.5 shrink-0" />
                    <span>{{ t('header.nextRound') }}</span>
                  </div>
                  <button
                    type="button"
                    class="sm:hidden text-[10px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-1"
                    @click.stop="isNextRoundInfoOpen = false"
                  >
                    ✕
                  </button>
                </div>
                <p class="text-[11px] sm:text-xs font-normal leading-tight text-gray-600 dark:text-gray-200">
                  {{ t('header.nextRoundHint') }}
                </p>
              </div>
            </transition>
          </div>

          <button
            class="min-h-[38px] py-1 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm w-full sm:w-auto justify-center"
            :class="crewStore.activeCrewMembers.length > 0 && !roundsStore.isViewingHistory && !roundsStore.isMaxRoundsReached
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-emerald-950/30'
              : 'bg-gray-200/60 dark:bg-gray-800/40 text-gray-400 dark:text-gray-500 border border-gray-300/50 dark:border-gray-700/30 cursor-not-allowed'"
            :disabled="crewStore.activeCrewMembers.length <= 0 || roundsStore.isViewingHistory || roundsStore.isMaxRoundsReached"
            data-test="new-round-btn"
            :title="roundsStore.isMaxRoundsReached ? 'Maximum rounds reached (10 rounds)' : t('header.nextRoundHint')"
            @click="initNewRound"
          >
            <AppIcon name="bell" class="w-4 h-4 shrink-0" />
            <div class="flex flex-col text-left leading-tight py-0.5">
              <div class="flex items-center gap-1">
                <span class="leading-tight">{{ t('header.nextRound') }}</span>
                <span v-if="roundsStore.isMaxRoundsReached" class="text-[9px] text-amber-300 font-semibold">(Max R10)</span>
              </div>
              <span class="text-[8px] sm:text-[9px] font-normal opacity-75 block mt-0.5 leading-tight">{{ t('header.meetingEnded') }}</span>
            </div>
          </button>
        </div>

        <div class="h-6 w-px bg-gray-300 dark:bg-gray-700/60 hidden sm:block" />

        <!-- New Match Button (Destructive / Full Reset Action) -->
        <button
          class="min-h-[38px] py-1 px-2.5 sm:px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0 justify-center"
          :class="crewStore.activeCrewMembers.length > 0
            ? 'bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-xs'
            : 'bg-gray-200/60 dark:bg-gray-800/40 text-gray-400 dark:text-gray-500 border border-gray-300/50 dark:border-gray-700/30 cursor-not-allowed'"
          :disabled="crewStore.activeCrewMembers.length <= 0"
          data-test="new-game-btn"
          title="Game concluded — reset deduction board for a new game (preserves lobby roster)"
          @click="initNewMatch"
        >
          <AppIcon name="refresh" class="w-3.5 h-3.5 shrink-0" />
          <div class="flex flex-col text-left leading-tight py-0.5">
            <span class="leading-tight">{{ t('header.newMatch') }}</span>
            <span class="text-[8px] sm:text-[9px] font-normal opacity-75 block mt-0.5 leading-tight">{{ t('header.resetGame') }}</span>
          </div>
        </button>
      </div>
    </header>

    <!-- Match Lobby & Roster Selector (18 Colors, Glowing LEDs, Presets) -->
    <GameRosterSelector ref="rosterSelectorRef" />

    <!-- Browser Zoom Notice Banner -->
    <div
      v-if="isBrowserZoomed && !isZoomNoticeDismissed"
      class="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-2 shadow-sm transition-all"
      data-test="zoom-warning-banner"
    >
      <div class="flex items-center gap-2 min-w-0">
        <AppIcon name="alert" class="w-4 h-4 text-amber-500 shrink-0" />
        <div class="leading-tight text-[11px] sm:text-xs">
          <span>{{ t('zoom.detected', { percent: browserZoomPercent }) }} <strong>{{ t('zoom.boardZoom') }}</strong> {{ t('zoom.inSettings').toLowerCase() }} </span>
          <button
            type="button"
            class="underline font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500"
            @click="openSettingsForZoom"
          >
            {{ t('dock.settings') }}
          </button>
          <span> {{ t('zoom.forCleanest') }}</span>
        </div>
      </div>
      <button
        type="button"
        class="shrink-0 p-1 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 rounded text-xs font-bold leading-none flex items-center justify-center"
        title="Dismiss notice"
        @click="dismissZoomNotice"
      >
        <AppIcon name="close" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- History Inspection Mode Warning Banner -->
    <div
      v-if="roundsStore.isViewingHistory"
      class="mb-3 px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/40 text-indigo-900 dark:text-indigo-200 text-xs flex items-center justify-between gap-2 shadow-sm"
    >
      <div class="flex items-center gap-2 min-w-0">
        <AppIcon name="clock" class="w-4 h-4 text-indigo-400 shrink-0" />
        <span class="leading-tight text-[11px] sm:text-xs">
          {{ t('header.historyNotice') }} <strong>R{{ roundsStore.viewingRoundNumber }}</strong> {{ t('header.historyReadOnly') }}
        </span>
      </div>
      <button
        type="button"
        class="shrink-0 px-2.5 py-1 text-xs font-bold rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        @click="roundsStore.setViewingRound(null)"
      >
        {{ t('header.returnToLive') }}
      </button>
    </div>

    <!-- Mobile Touch Drag Hint (Only shown on physical touch screens, never on desktop mouse even when resized) -->
    <div
      v-if="isTouchDevice"
      class="touch-only-hint lg:hidden flex items-center justify-center gap-1.5 py-1 px-2 mb-1.5 text-[11px] font-medium text-gray-600 dark:text-gray-400 select-none"
    >
      <AppIcon name="touch" class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
      <span>{{ t('header.mobileDragHint') }}</span>
    </div>

    <!-- 6 Strict Deduction Hierarchy Columns -->
    <CrewTracker
      :player-color="crewStore.playerColor"
      :hard-clear="displayedCrewMembers.hardClear"
      :trusted="displayedCrewMembers.trusted"
      :unknown="displayedCrewMembers.unknown"
      :suspicious="displayedCrewMembers.suspicious"
      :impostor="displayedCrewMembers.impostor"
      :dead="displayedCrewMembers.dead"
      :highlight-color-names="settingsStore.highlightColorNames"
      :show-player-names="settingsStore.showPlayerNames"
      class="mb-2 lg:mb-3"
      @changed="handleCrewChanged"
    />

    <!-- Unified Detective / Impostor Notepad (Collapsible, Voice-Integrated, Dual-Role) -->
    <DetectiveNotepad ref="notepadRef" class="mt-3 mb-4" />

    <!-- Interactive Map Section (Below Detective Notepad) -->
    <div class="relative mb-16">
      <Maps />
    </div>

    <!-- Modern Bottom Detective Toolbar (Persistent Dock) -->
    <footer class="fixed bottom-0 left-0 right-0 z-30 h-12 flex items-center justify-between px-1.5 sm:px-4 md:px-6 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800/80 shadow-2xl max-w-full overflow-x-hidden">
      <!-- Left: Investigation Tools (Notes, Map, Tasks, Impostor) -->
      <div class="flex items-center gap-1 sm:gap-2 shrink-0">
        <!-- Notes Button (Prominent & Evident) -->
        <button
          type="button"
          class="h-8 px-2 sm:px-3 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center gap-1 sm:gap-1.5 transition-all shrink-0 cursor-pointer"
          data-test="notes-btn"
          :title="`${t('dock.notes')} (N)`"
          @click="handleDockNotesClick"
        >
          <AppIcon name="notes" class="w-3.5 h-3.5 shrink-0" />
          <span class="hidden xs:inline sm:inline">{{ t('dock.notes') }}</span>
          <kbd class="hidden md:inline-block text-[10px] px-1 py-0.2 rounded bg-black/25 text-blue-100 font-mono">N</kbd>
        </button>

        <!-- Map Toggle Button -->
        <button
          type="button"
          class="h-8 px-1.5 sm:px-2.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 cursor-pointer"
          :class="mapsStore.isMapVisible
            ? 'bg-indigo-600/30 text-indigo-600 dark:text-indigo-300 border-indigo-500/50 hover:bg-indigo-600/40'
            : 'bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-gray-300 dark:border-gray-700/60'"
          data-test="toggle-map-btn"
          :title="`${mapsStore.isMapVisible ? t('dock.hideMap') : t('dock.map')} (M)`"
          @click="toggleMapVisibility"
        >
          <AppIcon name="map" class="w-3.5 h-3.5 shrink-0" />
          <span class="hidden xs:inline sm:inline">{{ mapsStore.isMapVisible ? t('dock.hideMap') : t('dock.map') }}</span>
          <kbd class="hidden md:inline-block text-[10px] px-1 py-0.2 rounded bg-black/25 text-gray-300 font-mono">M</kbd>
        </button>

        <!-- Tasks Reference Button -->
        <button
          type="button"
          class="h-8 px-2 sm:px-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 cursor-pointer shadow-xs"
          :class="impostorStore.isImpostorModeActive
            ? 'bg-amber-100 dark:bg-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 border border-amber-300 dark:border-amber-500/60 ring-1 ring-amber-400/40 dark:ring-amber-500/40 font-bold'
            : 'bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
          data-test="tasks-btn"
          :title="`${t('dock.tasksGuide')} (T)`"
          @click="toggleTasksModal"
        >
          <AppIcon name="tasks" class="w-3.5 h-3.5 shrink-0" :class="impostorStore.isImpostorModeActive ? 'text-amber-600 dark:text-amber-400' : 'opacity-80'" />
          <span class="hidden sm:inline">{{ t('dock.tasksGuide') }}</span>
          <span class="sm:hidden text-xs">{{ t('card.tasks') }}</span>
          <span
            v-if="impostorStore.isImpostorModeActive"
            class="text-[8px] sm:text-[9px] px-1 py-0.2 rounded bg-amber-500/30 text-amber-800 dark:text-amber-200 font-black uppercase tracking-wider"
          >
            Fake
          </span>
          <kbd class="hidden md:inline-block text-[10px] px-1 py-0.2 rounded bg-black/25 text-gray-300 font-mono">T</kbd>
        </button>

        <!-- Impostor Mode Direct Toggle Button -->
        <button
          type="button"
          class="h-8 px-2 sm:px-2.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 shadow-sm cursor-pointer"
          :class="impostorStore.isImpostorModeActive
            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/70 border border-rose-400 ring-2 ring-rose-500/80'
            : 'bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 border border-rose-200 dark:border-rose-800/50'"
          data-test="impostor-mode-btn"
          :title="`${t('dock.impostorMode')} (I)`"
          @click="impostorStore.toggleImpostorMode()"
        >
          <AppIcon name="skull" class="w-3.5 h-3.5 shrink-0" :class="impostorStore.isImpostorModeActive ? 'text-white' : 'text-rose-600 dark:text-rose-400'" />
          <span class="hidden sm:inline">{{ t('dock.impostorMode') }}</span>
          <span class="sm:hidden text-xs">{{ t('dock.impostorMode') }}</span>
          <kbd class="hidden md:inline-block text-[10px] px-1 py-0.2 rounded bg-black/25 text-rose-200 font-mono">I</kbd>
        </button>
      </div>

      <!-- Right: System Controls (Settings, Help, About) -->
      <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <button
          type="button"
          class="h-8 w-8 sm:w-auto px-0 sm:px-2.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          data-test="settings-btn"
          :title="t('dock.settings')"
          :aria-label="t('dock.settings')"
          @click="toggleSettingsModal"
        >
          <AppIcon name="settings" class="w-4 h-4 shrink-0" />
          <span class="hidden sm:inline">{{ t('dock.settings') }}</span>
        </button>
        <button
          type="button"
          class="h-8 w-8 sm:w-auto px-0 sm:px-2.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          data-test="help-btn"
          :title="t('dock.help')"
          :aria-label="t('dock.help')"
          @click="toggleHelpModal"
        >
          <AppIcon name="help" class="w-4 h-4 shrink-0" />
          <span class="hidden sm:inline">{{ t('dock.help') }}</span>
        </button>
        <button
          type="button"
          class="h-8 w-8 sm:w-auto px-0 sm:px-2.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800/60 hover:bg-gray-200 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          data-test="about-btn"
          :title="t('dock.about')"
          :aria-label="t('dock.about')"
          @click="toggleAboutModal"
        >
          <AppIcon name="about" class="w-4 h-4 shrink-0" />
          <span class="hidden sm:inline">{{ t('dock.about') }}</span>
        </button>
      </div>
    </footer>

    <HelpModal v-if="isHelpModalOpen" @close="toggleHelpModal" />
    <AboutModal v-if="isAboutModalOpen" @close="toggleAboutModal" />
    <SettingsModal v-if="isSettingsModalOpen" @close="toggleSettingsModal" />
    <TasksModal v-if="isTasksModalOpen" @close="isTasksModalOpen = false" />
    <CookieWarning />
  </div>
</template>

<script setup lang="ts">
import type { CrewMember } from '~/stores/crew'
import { useImpostorStore } from '~/stores/impostor'
import { touchMatchActivity } from '~/utils/sessionManager'

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const notesStore = useNotesStore()
const tasksStore = useTasksStore()
const roundsStore = useRoundsStore()
const mapsStore = useMapsStore()
const impostorStore = useImpostorStore()
const { gtag } = useGtag()
const { t } = useI18n()
const { micPermissionState, requestMicrophonePermission } = useMicrophone()

const notepadRef = ref<any>(null)
const rosterSelectorRef = ref<any>(null)

function toggleNotes() {
  if (!notepadRef.value) return
  if (notepadRef.value.isMinimized) {
    notepadRef.value.expandAndFocus()
  } else {
    notepadRef.value.minimize()
  }
}

function handleDockNotesClick() {
  toggleNotes()
}

function toggleMapVisibility() {
  mapsStore.toggleMap()
  if (mapsStore.isMapVisible) {
    nextTick(() => {
      document.querySelector('.map-container')?.scrollIntoView({ behavior: 'smooth' })
    })
  }
}

const isHelpModalOpen = ref(false)
const isAboutModalOpen = ref(false)
const isTasksModalOpen = ref(false)
const isNextRoundInfoOpen = ref(false)
const isNextRoundInfoHover = ref(false)
const isTouchDevice = ref(false)

const displayedCrewMembers = computed(() => {
  if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
    const list = roundsStore.activeSnapshot.crewMembers
    const active = list.filter((m) => m.isActive && (settingsStore.canTrackOwnColor ? true : m.color !== crewStore.playerColor))
    return {
      hardClear: active.filter((m) => m.status === 'hard_clear' && !m.isDead),
      trusted: active.filter((m) => m.status === 'trusted' && !m.isDead),
      unknown: active.filter((m) => m.status === 'unknown' && !m.isDead),
      suspicious: active.filter((m) => m.status === 'suspicious' && !m.isDead),
      impostor: active.filter((m) => m.status === 'impostor' && !m.isDead),
      dead: active.filter((m) => m.status === 'dead' || m.isDead),
    }
  }
  return {
    hardClear: crewStore.hardClearCrewMembers,
    trusted: crewStore.trustedCrewMembers,
    unknown: crewStore.unknownCrewMembers,
    suspicious: crewStore.suspiciousCrewMembers,
    impostor: crewStore.impostorCrewMembers,
    dead: crewStore.deadCrewMembers,
  }
})

const isNotesModalOpen = computed({
  get: () => notesStore.areNotesOpen,
  set: (value: boolean) => notesStore.setNotesOpenState(value),
})

const quickRoundNotes = computed({
  get: () => {
    if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
      return roundsStore.activeSnapshot.roundNotes || ''
    }
    return notesStore.roundNotes
  },
  set: (value: string) => {
    if (roundsStore.isViewingHistory) return
    notesStore.setRoundNotes(value)
  },
})

const isSettingsModalOpen = computed({
  get: () => settingsStore.settingsModalOpenState,
  set: (value: boolean) => settingsStore.setSettingsModalOpenState(value),
})

const isBrowserZoomed = ref(false)
const browserZoomPercent = ref(100)
const isZoomNoticeDismissed = ref(false)

function checkBrowserZoom() {
  if (typeof window === 'undefined') return
  // On mobile/tablet or touch screens, devicePixelRatio is screen pixel density (Retina/OLED 2.5x, 3x), NOT browser zoom.
  const isMobileOrTouch = window.innerWidth < 1024 || 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
  if (isMobileOrTouch) {
    isBrowserZoomed.value = false
    return
  }
  const dpr = window.devicePixelRatio || 1
  const vpScale = window.visualViewport?.scale || 1
  browserZoomPercent.value = Math.round(dpr * 100)
  // Trigger warning on desktop only if browser zoom is enlarged (> 118%) OR reduced (< 88%)
  isBrowserZoomed.value = vpScale > 1.05 || vpScale < 0.95 || dpr >= 1.18 || dpr <= 0.88
}

function dismissZoomNotice() {
  isZoomNoticeDismissed.value = true
  try {
    sessionStorage.setItem('dismissed_zoom_notice', 'true')
  } catch {}
}

function openSettingsForZoom() {
  settingsStore.setSettingsModalOpenState(true)
}

let keydownListener: ((e: KeyboardEvent) => void) | null = null
let zoomListener: (() => void) | null = null

onMounted(() => {
  touchMatchActivity()
  try {
    const storedReturning = localStorage.getItem('returningPlayer')
    if (!storedReturning || JSON.parse(storedReturning) !== true) {
      isHelpModalOpen.value = true
      localStorage.setItem('returningPlayer', JSON.stringify(true))
    }
  } catch {
    // Graceful fallback if localStorage is restricted or corrupted
  }
  try {
    isZoomNoticeDismissed.value = sessionStorage.getItem('dismissed_zoom_notice') === 'true'
  } catch {}

  checkBrowserZoom()
  zoomListener = checkBrowserZoom
  window.addEventListener('resize', zoomListener)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', zoomListener)
  }

  if (typeof window !== 'undefined') {
    const hasTouchSupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    isTouchDevice.value = (isCoarse || hasTouchSupport) && !isFinePointer
  }

  keydownListener = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null
    const isTyping = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)

    if (e.key === 'Escape' || e.code === 'Escape') {
      if (isTyping) {
        target.blur()
      }
      if (notepadRef.value && !notepadRef.value.isMinimized) {
        notepadRef.value.minimize()
      }
      return
    }

    if (isTyping) {
      return
    }

    if (e.code === 'KeyN' && !isSettingsModalOpen.value && !isHelpModalOpen.value && !isAboutModalOpen.value && !isTasksModalOpen.value) {
      e.preventDefault()
      toggleNotes()
      return
    }

    if (e.code === 'KeyM' && !isSettingsModalOpen.value && !isHelpModalOpen.value && !isAboutModalOpen.value && !isTasksModalOpen.value) {
      e.preventDefault()
      toggleMapVisibility()
      return
    }

    if (e.code === 'KeyT' && !isSettingsModalOpen.value && !isHelpModalOpen.value && !isAboutModalOpen.value) {
      e.preventDefault()
      toggleTasksModal()
      return
    }

    if (e.code === 'KeyI' && !isSettingsModalOpen.value && !isHelpModalOpen.value && !isAboutModalOpen.value && !isTasksModalOpen.value) {
      e.preventDefault()
      impostorStore.toggleImpostorMode()
      return
    }

    if (e.code === 'KeyL' && !isSettingsModalOpen.value && !isHelpModalOpen.value && !isAboutModalOpen.value && !isTasksModalOpen.value) {
      e.preventDefault()
      rosterSelectorRef.value?.toggleMinimize()
      return
    }
  }
  document.addEventListener('keydown', keydownListener)
})

onUnmounted(() => {
  if (keydownListener) {
    document.removeEventListener('keydown', keydownListener)
    keydownListener = null
  }
  if (zoomListener) {
    window.removeEventListener('resize', zoomListener)
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', zoomListener)
    }
    zoomListener = null
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
  gtag('event', 'init_new_match', { event_category: 'global_stats' })
}

function initNewRound() {
  // Archive current round before advancing (saves snapshot with current roundNotes)
  roundsStore.archiveCurrentRound(crewStore.crewMembers, notesStore.roundNotes)
  crewStore.resetActiveCrew()
  tasksStore.resetAllTasks()
  touchMatchActivity()
  // Retain notesStore.roundNotes so Round 2 inherits the notes draft from Round 1
  gtag('event', 'init_new_round', { event_category: 'global_stats' })
}

function handleCrewChanged({ type, value }: { type: string; value: CrewMember[] }) {
  if (roundsStore.isViewingHistory) return
  if (['hard_clear', 'trusted', 'unknown', 'suspicious', 'impostor', 'dead'].includes(type)) {
    crewStore.setColumnMembers(type as any, value)
  } else if (type === 'inactive') {
    crewStore.setInactiveCrewMembers(value)
  }
}

function toggleHelpModal() {
  const newValue = !isHelpModalOpen.value
  isHelpModalOpen.value = newValue
  if (newValue) gtag('event', 'open_help', { event_category: 'global_stats' })
}

function toggleAboutModal() {
  const newValue = !isAboutModalOpen.value
  isAboutModalOpen.value = newValue
  if (newValue) gtag('event', 'open_changelog', { event_category: 'global_stats' })
}

function toggleSettingsModal() {
  const newValue = !isSettingsModalOpen.value
  isSettingsModalOpen.value = newValue
  if (newValue) gtag('event', 'open_settings', { event_category: 'global_stats' })
}

function toggleNotesModal() {
  notepadRef.value?.expandAndFocus()
  gtag('event', 'open_notes', { event_category: 'global_stats' })
}

function toggleTasksModal() {
  const newValue = !isTasksModalOpen.value
  isTasksModalOpen.value = newValue
  if (newValue) gtag('event', 'open_fake_tasks', { event_category: 'global_stats' })
}
</script>

<style scoped>
@media (hover: hover) and (pointer: fine) {
  .touch-only-hint {
    display: none !important;
  }
}
</style>
