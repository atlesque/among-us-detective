<template>
  <div class="crew-tracker grid grid-cols-3" :class="trackerGridGapClass" data-test="crew-tracker">
    <!-- IMPOSTOR MODE DEDUCTION BOARD -->
    <template v-if="impostorStore.isImpostorModeActive">
      <!-- Column 1: Threats / Detectives (Top) & Vulnerable / Framable (Bottom) -->
      <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
        <!-- Box 1: Ameaças / Detetives (hardClearList) -->
        <div
          class="flex flex-col rounded border border-red-600/50 dark:border-red-900/70 bg-white dark:bg-gray-800 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: hardClearList.length === 0 }"
        >
          <div
            class="bg-red-900 text-red-100 font-bold flex items-center justify-between rounded-t select-none border-b border-red-700/40"
            :class="headerPaddingClass"
            :title="t('col.impostor.hardClearDesc')"
            data-test="crew-col-header-hard-clear"
          >
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="leading-tight break-words">{{ t('col.impostor.hardClear') }}</span>
            </div>
            <span class="opacity-80 font-normal ml-1 shrink-0">({{ hardClearList.length }})</span>
          </div>
          <div
            class="p-0.5 sm:p-1 flex-1 flex flex-col bg-red-950/5 dark:bg-red-950/20"
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

        <!-- Box 2: Vulneráveis / Incrimináveis (suspiciousList) -->
        <div
          class="flex flex-col rounded border border-amber-600/40 dark:border-amber-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: suspiciousList.length === 0 }"
        >
          <div
            class="bg-amber-700 text-white font-bold flex items-center justify-between rounded-t select-none"
            :class="headerPaddingClass"
            :title="t('col.impostor.suspiciousDesc')"
            data-test="crew-col-header-suspicious"
          >
            <span class="leading-tight break-words">{{ t('col.impostor.suspicious') }}</span>
            <span class="opacity-80 font-normal ml-1 shrink-0">({{ suspiciousList.length }})</span>
          </div>
          <div
            class="p-0.5 sm:p-1 flex-1 flex flex-col bg-amber-950/5 dark:bg-amber-950/15"
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

      <!-- Column 2: Neutral / Unknown (Top) & Eliminated (Bottom) -->
      <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
        <!-- Box 3: Neutros / Desconhecidos (unknownList) -->
        <div
          class="flex flex-col rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: unknownList.length === 0 }"
        >
          <div
            class="bg-gray-700 text-white font-bold flex items-center justify-between unknown-column rounded-t select-none"
            :class="headerPaddingClass"
            :title="t('col.impostor.unknownDesc')"
            data-test="crew-col-header-unknown"
          >
            <span class="leading-tight break-words">{{ t('col.impostor.unknown') }}</span>
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

        <!-- Box 4: Eliminados (deadList) -->
        <div
          class="flex flex-col rounded border border-neutral-300 dark:border-neutral-700/80 bg-white dark:bg-gray-900 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: deadList.length === 0 }"
        >
          <div
            class="bg-neutral-800 text-red-400 font-bold flex items-center justify-between rounded-t select-none border-b border-red-500/20"
            :class="headerPaddingClass"
            :title="t('col.impostor.deadDesc')"
            data-test="crew-col-header-dead"
          >
            <span class="leading-tight break-words">{{ t('col.impostor.dead') }}</span>
            <span class="opacity-80 font-normal ml-1 shrink-0">({{ deadList.length }})</span>
          </div>
          <div
            class="p-0.5 sm:p-1 bg-neutral-100/60 dark:bg-neutral-900/40 rounded-b flex-1 flex flex-col"
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

      <!-- Column 3: Partners (Top) & Shields / Controlled (Bottom) -->
      <div class="flex flex-col min-w-0" :class="trackerGridGapClass">
        <!-- Box 5: Parceiros (impostorList) -->
        <div
          class="flex flex-col rounded border border-rose-600/40 dark:border-rose-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: impostorList.length === 0 }"
        >
          <div
            class="bg-rose-700 text-white font-bold flex items-center justify-between rounded-t select-none"
            :class="headerPaddingClass"
            :title="t('col.impostor.impostorDesc')"
            data-test="crew-col-header-impostor"
          >
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="leading-tight break-words">{{ t('col.impostor.impostor') }}</span>
              <span
                class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-black/60 text-white border border-white/20 shadow-xs shrink-0 select-none leading-none font-mono"
                :title="`${remainingImpostors} ${t('roster.impostors')} ${remainingImpostors === 1 ? t('col.aliveSingle') : t('col.alive')}`"
              >
                {{ remainingImpostors }} {{ remainingImpostors === 1 ? t('col.aliveSingle') : t('col.alive') }}
              </span>
            </div>
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

        <!-- Box 6: Manipulados / Escudos (trustedList) -->
        <div
          class="flex flex-col rounded border border-teal-600/40 dark:border-teal-800/60 bg-white dark:bg-gray-800 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: trustedList.length === 0 }"
        >
          <div
            class="bg-teal-700 text-white font-bold flex items-center justify-between rounded-t select-none"
            :class="headerPaddingClass"
            :title="t('col.impostor.trustedDesc')"
            data-test="crew-col-header-trusted"
          >
            <span class="leading-tight break-words">{{ t('col.impostor.trusted') }}</span>
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
    </template>

    <!-- CREWMATE MODE DEDUCTION BOARD -->
    <template v-else>
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
            <span class="leading-tight break-words">{{ t('col.hardClear') }}</span>
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
            <span class="leading-tight break-words">{{ t('col.trusted') }}</span>
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
            <span class="leading-tight break-words">{{ t('col.unknown') }}</span>
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
          class="flex flex-col rounded border border-neutral-300 dark:border-neutral-700/80 bg-white dark:bg-gray-900 shadow-sm transition-all"
          :class="{ [boxMinHeightClass]: deadList.length === 0 }"
        >
          <div
            class="bg-neutral-800 text-red-400 font-bold flex items-center justify-between rounded-t select-none border-b border-red-500/20"
            :class="headerPaddingClass"
            data-test="crew-col-header-dead"
          >
            <span class="leading-tight break-words">{{ t('col.dead') }}</span>
            <span class="opacity-80 font-normal ml-1 shrink-0">({{ deadList.length }})</span>
          </div>
          <div
            class="p-0.5 sm:p-1 bg-neutral-100/60 dark:bg-neutral-900/40 rounded-b flex-1 flex flex-col"
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
            <div class="flex items-center gap-1.5 min-w-0">
              <span class="leading-tight break-words">{{ t('col.impostor') }}</span>
              <span
                class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-black/50 text-white border border-white/20 shadow-xs shrink-0 select-none leading-none font-mono"
                :title="`${remainingImpostors} ${t('roster.impostors')} ${remainingImpostors === 1 ? t('col.aliveSingle') : t('col.alive')}`"
              >
                {{ remainingImpostors }} {{ remainingImpostors === 1 ? t('col.aliveSingle') : t('col.alive') }}
              </span>
            </div>
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
            <span class="leading-tight break-words">{{ t('col.suspicious') }}</span>
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { type CrewMember, isImpostorRole, useCrewStore } from '~/stores/crew';

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

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const impostorStore = useImpostorStore()
const { t } = useI18n()

// Remaining alive impostors in the match
const remainingImpostors = computed(() => {
  return Math.max(0, settingsStore.matchImpostorsCount - crewStore.confirmedDeadImpostorsCount)
})

const trackerGridGapClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'gap-1.5 sm:gap-2'
  if (zoom === 'large') return 'gap-2.5 sm:gap-4'
  if (zoom === 'extra-large') return 'gap-3 sm:gap-5'
  return 'gap-2 sm:gap-3'
})

const boxMinHeightClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'min-h-[85px] sm:min-h-[105px]'
  if (zoom === 'large') return 'min-h-[135px] sm:min-h-[165px]'
  if (zoom === 'extra-large') return 'min-h-[160px] sm:min-h-[195px]'
  return 'min-h-[110px] sm:min-h-[135px]'
})

const poolMinHeightClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'min-h-[60px] sm:min-h-[80px]'
  if (zoom === 'large') return 'min-h-[105px] sm:min-h-[135px]'
  if (zoom === 'extra-large') return 'min-h-[125px] sm:min-h-[160px]'
  return 'min-h-[85px] sm:min-h-[110px]'
})

const headerPaddingClass = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'px-1.5 sm:px-2 py-1 sm:py-1.5 text-[9.5px] sm:text-[11.5px]'
  if (zoom === 'large') return 'px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-black'
  if (zoom === 'extra-large') return 'px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-black'
  return 'px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-[13px]'
})

// Deduction board column lists.
// All active players in the match are organized here, including your own card (with the ME badge).
// The canTrackOwnColor setting only affects the movement map pins, not this board.
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
