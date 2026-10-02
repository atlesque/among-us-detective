<template>
  <div class="game-roster-selector bg-white/95 dark:bg-black/90 rounded border border-gray-200 dark:border-gray-700/60 p-2 mb-2.5 shadow-sm transition-all">
    <!-- Header Bar (Always visible) -->
    <div class="flex flex-wrap items-center justify-center sm:justify-between gap-2 text-xs">
      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <!-- Minimize / Expand Toggle Button -->
        <button
          class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-bold transition-all shadow-sm cursor-pointer"
          :title="`${isMinimized ? t('roster.expand') : t('roster.minimize')} ${t('roster.title')} (L)`"
          @click="isMinimized = !isMinimized"
        >
          <AppIcon name="users" class="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span class="font-bold">{{ t('roster.title') }}</span>
          <kbd class="hidden md:inline-block text-[10px] px-1 py-0.2 rounded bg-black/30 text-gray-300 font-mono">L</kbd>
          <AppIcon
            name="chevron-down"
            class="w-3 h-3 text-gray-400 transition-transform duration-200"
            :class="isMinimized ? '-rotate-90' : 'rotate-0'"
          />
        </button>

        <!-- Count indicator -->
        <span
          class="px-2 py-0.5 font-bold rounded text-[11px] shadow-xs transition-colors"
          :class="activeCount <= 15
            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50'
            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50'"
        >
          {{ activeCount }} / 15 {{ t('roster.playing') }} ({{ 18 - activeCount }} {{ t('roster.notInGame') }})
        </span>

        <!-- ME: (Color) indicator badge — clickable to open color picker -->
        <button
          ref="colorPickerBtnRef"
          class="relative flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-100/90 dark:bg-yellow-400/15 border border-amber-300 dark:border-yellow-400/40 text-amber-900 dark:text-yellow-300 cursor-pointer hover:bg-amber-200/90 dark:hover:bg-yellow-400/30 hover:border-amber-400 dark:hover:border-yellow-400/70 active:scale-95 transition-all group shadow-xs"
          data-test="player-selector-btn"
          :title="t('roster.chooseColor')"
          @click.stop="toggleColorPicker"
        >
          <span class="text-[10px] font-black tracking-wider text-amber-700 dark:text-yellow-400">{{ t('roster.me') }}</span>
          <div class="w-4 h-4 flex items-center justify-center">
            <CrewIcon :color="crewStore.playerColor" :is-player="true" class="w-full h-full" />
          </div>
          <span class="text-[11px] font-bold capitalize text-gray-900 dark:text-white">{{ tColor(crewStore.playerColor) }}</span>
          <span class="text-[9px] text-amber-600 dark:text-yellow-400/60 group-hover:text-amber-800 dark:group-hover:text-yellow-400 transition-colors ml-0.5">▼</span>
        </button>
        <span
          class="hidden md:inline text-[9px] font-semibold leading-tight text-gray-400 dark:text-gray-500"
          :title="t('roster.rightClickHint')"
        >
          {{ t('roster.rightClickHint') }}
        </span>
      </div>

      <!-- Presets & Collapse State Control -->
      <div class="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-1.5 text-[10px] sm:text-[11px] mt-1 sm:mt-0 min-h-[24px]">
        <Transition name="fade">
          <div v-if="!isMinimized" class="flex items-center gap-1.5">
            <span class="text-gray-500 dark:text-gray-400 mr-0.5 hidden sm:inline">{{ t('roster.presets') }}</span>
            <button
              class="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
              :title="t('roster.preset15')"
              @click="setPreset15"
            >
              {{ t('roster.preset15') }}
            </button>
            <button
              class="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
              data-test="activate-all-btn"
              :title="t('roster.presetAll')"
              @click="selectAll"
            >
              {{ t('roster.presetAll') }}
            </button>
            <button
              class="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
              data-test="clear-all-btn"
              :title="t('roster.presetClear')"
              @click="clearAll"
            >
              {{ t('roster.presetClear') }}
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Color Picker Popover (opens when ME badge is clicked) -->
    <Teleport to="body">
      <Transition name="popover-scale">
        <div
          v-if="isColorPickerOpen"
          class="fixed inset-0 z-50 select-none bg-black/15 dark:bg-black/30 backdrop-blur-[1px]"
          @click.stop="isColorPickerOpen = false"
        >
          <div
            ref="colorPickerEl"
            class="fixed bg-white dark:bg-gray-900 border border-yellow-400/50 rounded-lg shadow-2xl p-2.5 sm:p-3 w-[280px] max-w-[calc(100vw-24px)] text-left"
            :style="colorPickerStyle"
            @click.stop
          >
            <div class="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-yellow-400 mb-2">
              {{ t('roster.chooseColor') }}
            </div>
            <div class="grid grid-cols-5 gap-1 sm:gap-1.5">
              <button
                v-for="color in allColors"
                :key="color"
                type="button"
                :data-test="`player-color-${color}`"
                class="w-full min-w-0 min-h-[48px] sm:min-h-[54px] flex flex-col items-center justify-center p-1 rounded transition-all cursor-pointer hover:scale-105 active:scale-95"
                :class="[
                  isPlayerColor(color)
                    ? 'ring-2 ring-yellow-400 bg-yellow-400/20 scale-105 sm:scale-110 shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700/60 hover:border-gray-400 dark:hover:border-gray-500'
                ]"
                :title="tColor(color)"
                @click="pickColor(color)"
              >
                <div class="w-5 h-5 flex items-center justify-center pointer-events-none">
                  <CrewIcon :color="color" :is-player="isPlayerColor(color)" class="w-full h-full" />
                </div>
                <span class="text-[7px] font-bold capitalize text-gray-700 dark:text-gray-300 mt-0.5 leading-[8px] break-words w-full text-center truncate">{{ tColor(color) }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 18 Colors: Compact Bean Character Row (collapsible) -->
    <Transition name="roster-collapse">
      <div
        v-if="!isMinimized"
        class="roster-collapse-wrapper overflow-hidden"
      >
        <div
          class="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 mt-1 sm:mt-1.5 border-t border-gray-200 dark:border-gray-800"
        >
          <div
            v-for="color in allColors"
            :key="color"
            class="roster-bean relative flex flex-col items-center justify-center p-0.5 sm:p-1 rounded transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer select-none"
            :class="[
              rosterBeanSizeClasses,
              isMemberActive(color)
                ? 'bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 border border-gray-300 dark:border-gray-700 opacity-100'
                : 'bg-gray-50/80 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-900/70 border border-dashed border-gray-300 dark:border-gray-800 opacity-50 hover:opacity-80 dark:opacity-35 dark:hover:opacity-65 grayscale',
              isPlayerColor(color) ? 'ring-2 ring-yellow-400 !border-yellow-400 !opacity-100 !grayscale-0 shadow-md' : ''
            ]"
            :title="`${tColor(color)} (${isMemberActive(color) ? t('roster.playing') : t('roster.notInGame')})${isPlayerColor(color) ? ` - ${t('card.me')}` : ''}`"
            @click="toggleActive(color)"
            @contextmenu.prevent="setAsMyPlayer(color)"
            @dblclick.prevent="setAsMyPlayer(color)"
          >
            <!-- Bean Avatar -->
            <div :class="rosterAvatarSizeClasses" class="flex items-center justify-center pointer-events-none">
              <CrewIcon
                :color="color"
                :is-dead="false"
                :is-player="isPlayerColor(color)"
                :show-player-name="false"
                class="w-full h-full"
              />
            </div>

            <!-- Dot / Me indicator -->
            <div class="mt-0.5 flex items-center justify-center">
              <span
                v-if="isPlayerColor(color)"
                class="text-[6px] sm:text-[8px] font-black px-0.5 sm:px-1 rounded bg-yellow-400 text-black leading-tight"
              >
                {{ t('roster.meBadge') }}
              </span>
              <span
                v-else
                class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors"
                :class="isMemberActive(color) ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 'bg-gray-400 dark:bg-gray-600'"
              />
            </div>

            <span
              class="mt-0.5 w-full text-center text-[6.5px] xs:text-[7px] sm:text-[8px] font-bold capitalize leading-[8px] sm:leading-[9px] truncate px-0.5 tracking-tight transition-colors"
              :class="settingsStore.highlightColorNames
                ? 'bg-gray-900 text-white dark:bg-white dark:text-black px-0.5 rounded shadow-sm'
                : isMemberActive(color)
                  ? 'text-gray-800 dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-400'"
            >
              {{ getRosterDisplayName(color) }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import allColors from '~/utils/playerColors.js'

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const { t, tColor } = useI18n()
const isMinimized = ref(false)
const isColorPickerOpen = ref(false)
const colorPickerEl = ref<HTMLElement | null>(null)

function getRosterDisplayName(color: string): string {
  if (settingsStore.showPlayerNames) {
    const member = crewStore.crewMembers.find((m) => m.color === color)
    if (member?.playerName) return member.playerName
  }
  return tColor(color)
}

const rosterBeanSizeClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') {
    return 'w-[36px] min-h-[42px] sm:w-[48px] sm:min-h-[52px] md:w-[54px] md:min-h-[56px]'
  }
  if (zoom === 'large') {
    return 'w-[52px] min-h-[58px] sm:w-[66px] sm:min-h-[74px] md:w-[72px] md:min-h-[76px]'
  }
  if (zoom === 'extra-large') {
    return 'w-[60px] min-h-[66px] sm:w-[76px] sm:min-h-[84px] md:w-[82px] md:min-h-[86px]'
  }
  return 'w-[44px] min-h-[50px] sm:w-[56px] sm:min-h-[62px] md:w-[62px] md:min-h-[64px]'
})

const rosterAvatarSizeClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'
  if (zoom === 'large') return 'w-7 h-7 sm:w-8.5 sm:h-8.5 md:w-9 md:h-9'
  if (zoom === 'extra-large') return 'w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11'
  return 'w-5.5 h-5.5 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5'
})

const activeCount = computed(() => {
  return crewStore.crewMembers.filter(m => m.isActive).length
})

const colorPickerBtnRef = ref<HTMLElement | null>(null)
const colorPickerPosition = ref<{ top: number; left: number }>({ top: 80, left: 12 })

function updateColorPickerPosition() {
  const btn = colorPickerBtnRef.value || (typeof document !== 'undefined' ? document.querySelector('[data-test="player-selector-btn"]') as HTMLElement | null : null)
  if (!btn) return
  const rect = btn.getBoundingClientRect()
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 360
  const pickerWidth = Math.min(280, Math.max(200, viewportWidth - 24))
  let left = rect.left
  const top = rect.bottom + 6

  // Prevent overflow right
  if (left + pickerWidth > viewportWidth - 12) {
    left = viewportWidth - pickerWidth - 12
  }
  if (left < 12) left = 12

  colorPickerPosition.value = { top, left }
}

function toggleColorPicker() {
  if (!isColorPickerOpen.value) {
    updateColorPickerPosition()
    isColorPickerOpen.value = true
  } else {
    isColorPickerOpen.value = false
  }
}

watch(isColorPickerOpen, (isOpen) => {
  if (isOpen) {
    const handleClose = () => { isColorPickerOpen.value = false }
    const handleScroll = () => { updateColorPickerPosition() }
    window.addEventListener('resize', handleClose, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    const unwatch = watch(isColorPickerOpen, (open) => {
      if (!open) {
        window.removeEventListener('resize', handleClose)
        window.removeEventListener('scroll', handleScroll, { capture: true })
        unwatch()
      }
    })
  }
})

// Position the color picker below the ME badge
const colorPickerStyle = computed(() => ({
  top: `${colorPickerPosition.value.top}px`,
  left: `${colorPickerPosition.value.left}px`,
  maxWidth: 'calc(100vw - 24px)',
}))

function isMemberActive(color: string) {
  const m = crewStore.crewMembers.find(x => x.color === color)
  return m ? m.isActive : false
}

function isPlayerColor(color: string) {
  return crewStore.playerColor === color
}

function toggleActive(color: string) {
  crewStore.togglePlayerActive(color)
}

function setAsMyPlayer(color: string) {
  crewStore.setPlayerColor(color)
}

function pickColor(color: string) {
  crewStore.setPlayerColor(color)
  isColorPickerOpen.value = false
}

function setPreset15() {
  crewStore.setPresetPlayerCount(15)
}

function setPreset10() {
  crewStore.setPresetPlayerCount(10)
}

function selectAll() {
  crewStore.setPresetPlayerCount(18)
}

// Deactivates all beans so the user can click only the players in their custom game.
function clearAll() {
  crewStore.setPresetPlayerCount(0)
}

function toggleMinimize() {
  isMinimized.value = !isMinimized.value
}

defineExpose({
  isMinimized,
  toggleMinimize,
})
</script>

<style scoped>
.roster-bean {
  position: relative;
  flex-shrink: 0;
}
</style>
