<template>
  <div class="crew-tracker grid grid-cols-3" :class="trackerGridGapClass" data-test="crew-tracker">
    <!-- Column 1: Hard Clear (Top) & Trusted (Bottom) -->
    <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
      <!-- Hard Clear Box -->
      <div
        class="flex flex-col rounded border border-emerald-600/40 dark:border-emerald-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: hardClearList.length === 0 }"
      >
        <div
          class="bg-emerald-700 text-white font-bold flex items-center justify-between rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-hard-clear"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.hardClear') : t('col.hardClear') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ hardClearList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: hardClearList.length === 0 }"
          data-test="crew-column-hard-clear"
        >
          <CrewPool
            class="pool--hard_clear flex-1"
            :crew-members="hardClearList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'hard_clear', value })"
          />
        </div>
      </div>

      <!-- Trusted Box (underneath Hard Clear) -->
      <div
        class="flex flex-col rounded border border-teal-600/40 dark:border-teal-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: trustedList.length === 0 }"
      >
        <div
          class="bg-teal-700 text-white font-bold flex items-center justify-between rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-trusted"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.trusted') : t('col.trusted') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ trustedList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: trustedList.length === 0 }"
          data-test="crew-column-trusted"
        >
          <CrewPool
            class="pool--trusted flex-1"
            :crew-members="trustedList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'trusted', value })"
          />
        </div>
      </div>
    </div>

    <!-- Column 2: Unknown (Top) & Dead (Bottom - underneath Unknown) -->
    <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
      <!-- Unknown Box -->
      <div
        class="flex flex-col rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: unknownList.length === 0 }"
      >
        <div
          class="bg-gray-700 text-white font-bold flex items-center justify-between unknown-column rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-unknown"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.unknown') : t('col.unknown') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ unknownList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: unknownList.length === 0 }"
          data-test="crew-column-unknown"
        >
          <CrewPool
            class="pool--unknown flex-1"
            :crew-members="unknownList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'unknown', value })"
          />
        </div>
      </div>

      <!-- Dead Box (underneath Unknown) -->
      <div
        class="flex flex-col rounded border border-neutral-700/80 bg-white dark:bg-gray-900 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: deadList.length === 0 }"
      >
        <div
          class="bg-neutral-800 text-red-400 font-bold flex items-center justify-between rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-dead"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.dead') : t('col.dead') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ deadList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 bg-neutral-900/40 rounded-b flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: deadList.length === 0 }"
          data-test="crew-column-dead"
        >
          <CrewPool
            class="pool--dead flex-1"
            :crew-members="deadList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'dead', value })"
          />
        </div>
      </div>
    </div>

    <!-- Column 3: Impostor (Top) & Suspicious (Bottom) -->
    <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
      <!-- Impostor Box -->
      <div
        class="flex flex-col rounded border border-rose-600/40 dark:border-rose-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: impostorList.length === 0 }"
      >
        <div
          class="bg-rose-700 text-white font-bold flex items-center justify-between rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-impostor"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.impostor') : t('col.impostor') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ impostorList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: impostorList.length === 0 }"
          data-test="crew-column-impostor"
        >
          <CrewPool
            class="pool--impostor flex-1"
            :crew-members="impostorList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'impostor', value })"
          />
        </div>
      </div>

      <!-- Suspicious Box (underneath Impostor) -->
      <div
        class="flex flex-col rounded border border-amber-600/40 dark:border-amber-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
        :class="{ [boxMinHeightClass]: suspiciousList.length === 0 }"
      >
        <div
          class="bg-amber-700 text-white font-bold flex items-center justify-between rounded-t select-none"
          :class="headerPaddingClass"
          data-test="crew-col-header-suspicious"
        >
          <span class="leading-tight break-words">{{ impostorStore.isImpostorModeActive ? t('col.impostor.suspicious') : t('col.suspicious') }}</span>
          <span class="opacity-80 font-normal ml-1 shrink-0">({{ suspiciousList.length }})</span>
        </div>
        <div
          class="p-0.5 sm:p-1 flex-1 flex flex-col"
          :class="{ [poolMinHeightClass]: suspiciousList.length === 0 }"
          data-test="crew-column-suspicious"
        >
          <CrewPool
            class="pool--suspicious flex-1"
            :crew-members="suspiciousList"
            :highlight-color-names="highlightColorNames"
            :show-player-names="showPlayerNames"
            @changed="value => emit('changed', { type: 'suspicious', value })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CrewMember } from '~/stores/crew';

const props = defineProps<{
  playerColor: string
  hardClear: CrewMember[]
  trusted: CrewMember[]
  unknown: CrewMember[]
  suspicious: CrewMember[]
  impostor: CrewMember[]
  dead: CrewMember[]
  highlightColorNames?: boolean
  showPlayerNames?: boolean
}>()

const emit = defineEmits<{
  changed: [payload: { type: string; value: CrewMember[] }]
}>()

const settingsStore = useSettingsStore()
const impostorStore = useImpostorStore()
const { t } = useI18n()

const trackerGridGapClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'gap-1 sm:gap-1.5'
  if (zoom === 'large') return 'gap-2 sm:gap-3'
  if (zoom === 'extra-large') return 'gap-2.5 sm:gap-4'
  return 'gap-1.5 sm:gap-2'
})

const boxMinHeightClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'min-h-[64px] sm:min-h-[76px]'
  if (zoom === 'large') return 'min-h-[110px] sm:min-h-[135px]'
  if (zoom === 'extra-large') return 'min-h-[135px] sm:min-h-[165px]'
  return 'min-h-[85px] sm:min-h-[105px]'
})

const poolMinHeightClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'min-h-[44px] sm:min-h-[55px]'
  if (zoom === 'large') return 'min-h-[85px] sm:min-h-[110px]'
  if (zoom === 'extra-large') return 'min-h-[105px] sm:min-h-[135px]'
  return 'min-h-[60px] sm:min-h-[80px]'
})

const headerPaddingClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'px-1 sm:px-1.5 py-0.5 sm:py-1 text-[8.5px] sm:text-[10px]'
  if (zoom === 'large') return 'px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[13px]'
  if (zoom === 'extra-large') return 'px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-black'
  return 'px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9.5px] sm:text-[11.5px]'
})

const hardClearList = computed({
  get: () => props.hardClear,
  set: (value: CrewMember[]) => emit('changed', { type: 'hard_clear', value }),
})

const trustedList = computed({
  get: () => props.trusted,
  set: (value: CrewMember[]) => emit('changed', { type: 'trusted', value }),
})

const unknownList = computed({
  get: () => props.unknown,
  set: (value: CrewMember[]) => emit('changed', { type: 'unknown', value }),
})

const suspiciousList = computed({
  get: () => props.suspicious,
  set: (value: CrewMember[]) => emit('changed', { type: 'suspicious', value }),
})

const impostorList = computed({
  get: () => props.impostor,
  set: (value: CrewMember[]) => emit('changed', { type: 'impostor', value }),
})

const deadList = computed({
  get: () => props.dead,
  set: (value: CrewMember[]) => emit('changed', { type: 'dead', value }),
})
</script>
