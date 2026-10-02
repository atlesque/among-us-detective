<template>
  <div
    class="player-card relative flex flex-col items-center justify-start gap-0 p-0.5 sm:p-1 rounded transition-all duration-200 select-none group"
    :class="[
      isEffectiveReadOnly ? 'cursor-default' : 'cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]',
      isPlayer ? 'ring-2 ring-yellow-400 bg-yellow-400/10 shadow' : 'shadow-sm',
      isFellowImpostor ? 'ring-2 ring-rose-500 bg-rose-950/20 shadow' : '',
      member.isDead
        ? 'bg-red-50/80 dark:bg-neutral-900/80 border border-red-200 dark:border-red-900/40 opacity-80 hover:opacity-100'
        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
      cardSizeClasses
    ]"
    :aria-label="`${(showPlayerNames && member.playerName) ? member.playerName : tColor(member.color)}${member.role ? `, ${member.role}, ${member.roleConfirmed ? 'Verified' : 'Claimed'}` : ''}`"
    :title="isEffectiveReadOnly
      ? `${(showPlayerNames && member.playerName) ? member.playerName : tColor(member.color)}${member.role ? ' (' + member.role + ')' : ''} [${t('notes.readOnlySnapshot')}]`
      : `${(showPlayerNames && member.playerName) ? member.playerName : tColor(member.color)}${member.role ? ' (' + member.role + (member.roleConfirmed ? ' - Verified' : ' - Claimed') + ')' : ''}. ${t('card.clickForOptions')}`"
    :role="isEffectiveReadOnly ? undefined : 'button'"
    :tabindex="isEffectiveReadOnly ? -1 : 0"
    @keydown.enter.prevent="handleCardClick"
    @keydown.space.prevent="handleCardClick"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @click.stop="handleCardClick"
    @contextmenu.prevent="openMenu"
    @dragstart="closeMenu"
  >
    <span
      class="w-full shrink-0 font-bold capitalize text-center break-words leading-tight rounded mb-1 sm:mb-1.5"
      :class="[
        nameTextClasses,
        highlightColorNames
          ? 'px-0.5 sm:px-1 py-0.5 bg-gray-900 text-white dark:bg-white dark:text-black ring-1 ring-gray-700 dark:ring-gray-300 shadow-sm'
          : 'text-gray-900 dark:text-white bg-transparent'
      ]"
    >
      {{ (showPlayerNames && member.playerName) ? member.playerName : tColor(member.color) }}
    </span>

    <!-- Avatar Character Bean -->
    <div
      class="relative shrink-0 flex items-center justify-center pointer-events-none"
      :class="beanSizeClasses"
    >
      <CrewIcon
        :color="member.color"
        :is-dead="member.isDead"
        :is-player="member.isPlayer"
        :player-name="member.playerName"
        :show-player-name="false"
        :auto-width="true"
        :auto-height="true"
        class="w-full h-full"
      />
      <!-- Died in Round badge -->
      <span
        v-if="member.isDead && member.diedInRound"
        class="absolute -top-1.5 -right-2 z-30 px-1.5 py-0.5 bg-red-600 text-white text-[8px] sm:text-[9px] font-black rounded-md border border-white/80 shadow-md leading-none select-none flex items-center gap-0.5"
        :title="`Died in Round ${member.diedInRound}`"
      >
        <AppIcon name="dead" class="w-2.5 h-2.5 shrink-0" />
        <span>R{{ member.diedInRound }}</span>
      </span>
      <!-- Fellow Impostor Indicator Badge -->
      <span
        v-if="isFellowImpostor && !member.isDead"
        class="absolute -top-1.5 -left-1.5 z-30 px-1 py-0.5 bg-rose-600 text-white rounded border border-white/80 shadow-md flex items-center justify-center text-[7px] font-black leading-none select-none imp-badge"
        title="Fellow Impostor"
        data-test="imp-badge"
      >
        IMP
      </span>
      <!-- Tasks Finished Indicator Badge -->
      <span
        v-if="member.isDoneWithTasks && !member.isDead && !isFellowImpostor"
        class="absolute -top-1.5 -left-1.5 z-30 w-3.5 h-3.5 bg-emerald-600 text-white rounded-full border border-white/80 shadow-md flex items-center justify-center text-[8px] font-black leading-none select-none"
        title="Tasks finished"
        data-test="tasks-done-badge"
      >
        ✓
      </span>
    </div>

    <!-- Reveal the role below the stable name and bean without moving either one. -->
    <Transition name="role-reveal">
      <div
        v-if="member.role"
        class="flex flex-col items-center justify-center mt-0.5 sm:mt-1 min-w-0 max-w-full"
      >
        <RoleIcon
          :key="member.role"
          :role="member.role"
          :confirmed="member.roleConfirmed"
          size="sm"
          class="shrink-0 role-pop-badge"
          :class="roleIconClasses"
        />
        <span
          :key="member.role"
          class="w-full font-bold capitalize text-center break-words leading-tight mt-0.5 role-pop-badge"
          :class="[
            isImpostorRole ? 'text-rose-500 dark:text-rose-400' : 'text-[#0f88b3] dark:text-[#38bdf8]',
            roleTextClasses
          ]"
        >
          {{ member.role }}
        </span>
      </div>
    </Transition>

    <!-- History evolution indicator (if viewing past round and current live status differs) -->
    <span
      v-if="roundsStore.isViewingHistory && liveStatusDifference"
      class="w-full text-[7px] font-bold text-center truncate leading-none mt-0.5 px-0.5 py-0.5 rounded bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30"
      :title="`Current status in Live game: ${liveStatusDifference}`"
    >
      Now: {{ liveStatusDifference }}
    </span>

    <!-- Compact Floating Popover Menu (Teleported to body, anchored beside clicked card) -->
    <Teleport to="body">
      <Transition name="popover-scale">
        <div
          v-if="isCurrentMenuOpen"
          class="fixed inset-0 z-50 select-none"
        >
          <div
            class="fixed inset-0 bg-black/10 dark:bg-black/30 backdrop-blur-[1px] transition-opacity"
            data-test="card-menu-overlay"
            @click.stop="closeMenu"
            @contextmenu.prevent.stop="closeMenu"
          />
          <div
            class="fixed bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl p-2.5 w-[275px] max-w-[calc(100vw-16px)] text-left text-xs text-gray-800 dark:text-gray-100 max-h-[min(480px,calc(100vh-20px))] overflow-y-auto"
            :style="menuStyle"
            data-card-popover-menu
            @click.stop
          >
          <!-- Header: Color Dot, Player Name, Clear Role & Set as Me -->
          <div class="flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-1.5 min-w-0">
              <span
                class="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0 shadow-sm"
                :class="`bg-player-${member.color}`"
              />
              <span class="font-bold capitalize truncate text-xs text-gray-900 dark:text-gray-100">
                {{ member.playerName || tColor(member.color) }}
              </span>
            </div>

            <div class="flex items-center gap-1 shrink-0">
              <button
                v-if="member.role"
                type="button"
                class="px-1.5 py-0.5 text-[10px] text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-0.5"
                :title="t('card.clearRole')"
                @click="clearRole"
              >
                <AppIcon name="close" class="w-2.5 h-2.5" />
                <span>{{ t('card.clearRole') }}</span>
              </button>

              <button
                v-if="!member.isPlayer"
                type="button"
                class="shrink-0 px-2 py-0.5 text-[11px] font-bold rounded bg-amber-100 dark:bg-yellow-400/20 text-amber-800 dark:text-yellow-300 border border-amber-300 dark:border-yellow-400/30 hover:bg-amber-200 dark:hover:bg-yellow-400 hover:text-amber-950 dark:hover:text-black transition-colors"
                :title="t('card.setAsMe')"
                @click="setAsMyPlayer"
              >
                {{ t('card.setAsMe') }}
              </button>
              <span
                v-else
                class="shrink-0 px-2 py-0.5 text-[11px] font-bold rounded bg-yellow-400 text-black shadow-sm flex items-center gap-1"
              >
                <AppIcon name="star" class="w-3 h-3 fill-current" />
                <span>{{ t('card.me') }}</span>
              </span>
            </div>
          </div>

          <!-- Impostor Roles (When Impostor Mode is active, shown on TOP) -->
          <div v-if="impostorStore.isImpostorModeActive" class="mb-2">
            <div class="flex items-center justify-between mb-1">
              <div class="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                {{ t('card.impostorRoles') }}
              </div>
              <span v-if="isFellowImpostor" class="text-[9px] font-bold text-rose-400">
                {{ t('card.fellowImpostorActive') }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <button
                v-for="r in impostorRoles"
                :key="r"
                type="button"
                :disabled="member.status === 'hard_clear'"
                :data-test="`impostor-role-${r.toLowerCase()}`"
                class="flex items-center gap-1.5 px-2 py-1 text-[11px] rounded border transition-colors text-left"
                :class="member.status === 'hard_clear'
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-60'
                  : member.role === r
                  ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-rose-500/20 text-gray-700 dark:text-gray-300 border-transparent'"
                @click="selectRole(r)"
              >
                <RoleIcon :role="r" size="sm" :show-badge="false" class="w-3.5 h-3.5 shrink-0" />
                <span class="whitespace-nowrap">{{ r }}</span>
              </button>
            </div>
          </div>

          <!-- Crew Roles (Always shown) -->
          <div class="mb-2">
            <div class="text-[10px] font-bold uppercase tracking-wider text-[#0f88b3] dark:text-[#38bdf8] mb-1">
              {{ t('card.crewRoles') }}
            </div>
            <div class="grid grid-cols-2 gap-1">
              <button
                v-for="r in crewRoles"
                :key="r"
                type="button"
                :disabled="member.status === 'impostor'"
                class="flex items-center gap-1.5 px-2 py-1 text-[11px] rounded border transition-colors text-left"
                :class="member.status === 'impostor'
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-60'
                  : member.role === r
                  ? 'bg-[#0f88b3] text-white border-[#0f88b3] font-bold shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-[#0f88b3]/20 text-gray-700 dark:text-gray-300 border-transparent'"
                @click="selectRole(r)"
              >
                <RoleIcon :role="r" size="sm" :show-badge="false" class="w-3.5 h-3.5 shrink-0" />
                <span class="whitespace-nowrap">{{ r }}</span>
              </button>
            </div>
          </div>

          <!-- Impostor Roles (When normal mode, shown below Crew Roles) -->
          <div v-if="!impostorStore.isImpostorModeActive" class="mb-2">
            <div class="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
              {{ t('card.impostorRoles') }}
            </div>
            <div class="grid grid-cols-2 gap-1">
              <button
                v-for="r in impostorRoles"
                :key="r"
                type="button"
                :disabled="member.status === 'hard_clear'"
                class="flex items-center gap-1.5 px-2 py-1 text-[11px] rounded border transition-colors text-left"
                :class="member.status === 'hard_clear'
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-60'
                  : member.role === r
                  ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-rose-500/20 text-gray-700 dark:text-gray-300 border-transparent'"
                @click="selectRole(r)"
              >
                <RoleIcon :role="r" size="sm" :show-badge="false" class="w-3.5 h-3.5 shrink-0" />
                <span class="whitespace-nowrap">{{ r }}</span>
              </button>
            </div>
          </div>

          <!-- Role Confirmation & Verification (Only shown when a role is selected) -->
          <div
            v-if="member.role"
            class="mb-2 rounded-md border p-1.5"
            :class="member.roleConfirmed
              ? isImpostorRole
                ? 'border-rose-500/50 bg-rose-500/10'
                : 'border-[#0f88b3]/50 bg-[#0f88b3]/10'
              : 'border-amber-300 dark:border-yellow-500/50 bg-amber-50 dark:bg-yellow-500/10'"
            data-test="role-confirmation"
          >
            <div class="flex items-center justify-between gap-2 mb-1">
              <span
                class="text-[10px] font-bold uppercase tracking-wider"
                :class="member.roleConfirmed
                  ? isImpostorRole ? 'text-rose-600 dark:text-rose-400' : 'text-[#0f88b3] dark:text-[#38bdf8]'
                  : 'text-amber-800 dark:text-yellow-400'"
              >
                {{ member.roleConfirmed ? t('card.roleVerified') : t('card.confirmRole') }}
              </span>
              <span
                class="text-[10px] font-bold"
                :class="member.roleConfirmed
                  ? isImpostorRole ? 'text-rose-600 dark:text-rose-400' : 'text-[#0f88b3] dark:text-[#38bdf8]'
                  : 'text-amber-800 dark:text-yellow-400'"
              >
                {{ member.roleConfirmed ? t('card.verified') : t('card.claimed') }}
              </span>
            </div>
            <button
              type="button"
              class="w-full py-1 px-2 text-[11px] font-bold rounded transition-colors text-center flex items-center justify-center gap-1.5"
              :class="member.roleConfirmed
                ? isImpostorRole
                  ? 'bg-rose-700 text-white hover:bg-rose-600 shadow-sm'
                  : 'bg-[#0f88b3] text-white hover:bg-[#0c7499] shadow-sm'
                : isImpostorRole
                  ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm'
                  : 'bg-[#0f88b3] text-white hover:bg-[#0c7499] shadow-sm'"
              @click="toggleRoleConfirmed"
            >
              <AppIcon v-if="!member.roleConfirmed" name="check" class="w-3 h-3 stroke-[3]" />
              <span>{{ member.roleConfirmed ? t('card.undoVerification') : isImpostorRole ? t('card.confirmImpostor') : t('card.confirmRole') }}</span>
            </button>
          </div>

          <!-- Task Completion & Emergency Meetings Controls -->
          <div class="mb-2 p-1.5 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-1.5">
            <!-- Tasks Done Toggle -->
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <AppIcon name="tasks" class="w-3 h-3" />
                <span>{{ t('card.tasks') }}</span>
              </span>
              <button
                type="button"
                class="px-2 py-0.5 text-[10px] font-bold rounded border transition-colors flex items-center gap-1"
                :class="member.isDoneWithTasks
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100'"
                data-test="card-toggle-tasks-btn"
                @click="toggleTasksDone"
              >
                <span>{{ member.isDoneWithTasks ? t('card.tasksDone') : t('card.tasksInProgress') }}</span>
              </button>
            </div>

            <!-- Emergency Meetings Count -->
            <div class="flex items-center justify-between pt-1 border-t border-gray-200/60 dark:border-gray-700/50">
              <span class="text-[10px] font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <AppIcon name="bell" class="w-3 h-3" />
                <span>{{ t('card.meetings') }}</span>
              </span>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="w-4 h-4 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-[10px] font-bold leading-none"
                  title="Decrement meetings"
                  @click="decrementMeetings"
                >
                  -
                </button>
                <span class="text-[10px] font-bold w-3.5 text-center">{{ member.totalMeetingsHeld || 0 }}</span>
                <button
                  type="button"
                  class="w-4 h-4 flex items-center justify-center rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-[10px] font-bold leading-none"
                  title="Increment meetings"
                  @click="incrementMeetings"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom action: Mark as dead / Revive -->
          <div class="pt-2 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              class="w-full py-1.5 px-2 text-[11px] font-bold rounded transition-colors flex items-center justify-center gap-1.5"
              :class="member.isDead
                ? 'bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/30 border border-red-300 dark:border-red-500/40'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white border border-gray-300 dark:border-gray-700'"
              @click="handleToggleDead"
            >
              <AppIcon :name="member.isDead ? 'heart' : 'dead'" class="w-3.5 h-3.5 shrink-0" />
              <span>{{ member.isDead ? t('card.revivePlayer') : t('card.markAsDead') }}</span>
              <span v-if="member.isDead && member.diedInRound" class="text-[9px] opacity-80 ml-1">
                ({{ t('card.diedInRound', { round: member.diedInRound }) }})
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'

// Shared module singleton ensures ONLY ONE menu can be open across all cards
export const activeMenuColor = ref<string | null>(null)
const menuPosition = ref<{ top: number; left: number }>({ top: 0, left: 0 })
</script>

<script setup lang="ts">
import type { CrewMember } from '~/stores/crew'
import { useImpostorStore } from '~/stores/impostor'

const props = defineProps<{
  member: CrewMember
  highlightColorNames?: boolean
  showPlayerNames?: boolean
  isPlayer?: boolean
  isReadOnly?: boolean
}>()

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const roundsStore = useRoundsStore()
const impostorStore = useImpostorStore()
const { t, tColor } = useI18n()

const isEffectiveReadOnly = computed(() => props.isReadOnly === true || roundsStore.isViewingHistory)

const isFellowImpostor = computed(() => impostorStore.isFellowImpostor(props.member.color))


const liveStatusDifference = computed(() => {
  if (!roundsStore.isViewingHistory) return null
  const liveMember = crewStore.crewMembers.find((m) => m.color === props.member.color)
  if (!liveMember) return null
  if (liveMember.status !== props.member.status) {
    const statusMap: Record<string, string> = {
      hard_clear: t('col.hardClear'),
      trusted: t('col.trusted'),
      unknown: t('col.unknown'),
      suspicious: t('col.suspicious'),
      impostor: t('col.impostor'),
      dead: t('col.dead'),
    }
    return statusMap[liveMember.status] || liveMember.status
  }
  return null
})

const cardSizeClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') {
    return [
      'w-[48px] sm:w-[56px] md:w-[62px]',
      'h-auto pb-1 sm:pb-1.5'
    ]
  }
  if (zoom === 'large') {
    return [
      'w-[74px] sm:w-[86px] md:w-[96px]',
      'h-auto pb-2 sm:pb-2.5'
    ]
  }
  if (zoom === 'extra-large') {
    return [
      'w-[88px] sm:w-[102px] md:w-[114px]',
      'h-auto pb-2.5 sm:pb-3'
    ]
  }
  return [
    'w-[60px] sm:w-[70px] md:w-[78px]',
    'h-auto pb-1.5 sm:pb-2'
  ]
})

const beanSizeClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'w-8 h-8 sm:w-9 sm:h-9'
  if (zoom === 'large') return 'w-12 h-12 sm:w-14 sm:h-14'
  if (zoom === 'extra-large') return 'w-14 h-14 sm:w-16 sm:h-16'
  return 'w-10 h-10 sm:w-11 sm:h-11'
})

const nameTextClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'text-[8px] sm:text-[9px] leading-tight min-h-[14px]'
  if (zoom === 'large') return 'text-[11px] sm:text-[12.5px] leading-tight min-h-[18px]'
  if (zoom === 'extra-large') return 'text-[12.5px] sm:text-[14px] leading-tight min-h-[20px]'
  return 'text-[9.5px] sm:text-[11px] leading-tight min-h-[16px]'
})

const roleIconClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'w-3.5 h-3.5 sm:w-4 sm:h-4'
  if (zoom === 'large') return 'w-5.5 h-5.5 sm:w-6.5 sm:h-6.5'
  if (zoom === 'extra-large') return 'w-6.5 h-6.5 sm:w-7.5 sm:h-7.5'
  return 'w-4.5 h-4.5 sm:w-5 sm:h-5'
})

const roleTextClasses = computed(() => {
  const zoom = settingsStore.boardZoom || 'normal'
  if (zoom === 'compact') return 'text-[8px] sm:text-[9px]'
  if (zoom === 'large') return 'text-[10.5px] sm:text-[12px]'
  if (zoom === 'extra-large') return 'text-[12px] sm:text-[13.5px]'
  return 'text-[9px] sm:text-[10px]'
})

const isCurrentMenuOpen = computed(() => activeMenuColor.value === props.member.color)

const crewRoles = ['Detective', 'Judge', 'Scientist', 'Engineer', 'Noisemaker']
const impostorRoles = ['Impostor', 'Shapeshifter', 'Phantom', 'Viper']

const isImpostorRole = computed(() => {
  return props.member.role && impostorRoles.includes(props.member.role)
})

const menuStyle = computed(() => ({
  top: `${menuPosition.value.top}px`,
  left: `${menuPosition.value.left}px`,
}))

let scrollListener: (() => void) | null = null
let escListener: ((e: KeyboardEvent) => void) | null = null
let resizeListener: (() => void) | null = null

function cleanupListeners() {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener, { capture: true })
    scrollListener = null
  }
  if (escListener) {
    window.removeEventListener('keydown', escListener)
    escListener = null
  }
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener)
    resizeListener = null
  }
}

// Close on Escape key or when the page is scrolled or resized
watch(isCurrentMenuOpen, (isOpen) => {
  cleanupListeners()
  if (isOpen) {
    escListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }
    scrollListener = (e?: Event) => {
      const target = e?.target as HTMLElement | null
      if (target && target.closest?.('[data-card-popover-menu]')) {
        return
      }
      closeMenu()
    }
    resizeListener = () => {
      closeMenu()
    }
    window.addEventListener('keydown', escListener)
    window.addEventListener('scroll', scrollListener, { passive: true, capture: true })
    window.addEventListener('resize', resizeListener, { passive: true })
  }
})

onBeforeUnmount(() => {
  cleanupListeners()
})

let touchStartX = 0
let touchStartY = 0
let isTouchDragging = false

function handleTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    isTouchDragging = false
  }
}

function handleTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    const dx = Math.abs(e.touches[0].clientX - touchStartX)
    const dy = Math.abs(e.touches[0].clientY - touchStartY)
    if (dx > 8 || dy > 8) {
      isTouchDragging = true
      closeMenu()
    }
  }
}

function handleCardClick(e?: MouseEvent | KeyboardEvent) {
  if (isEffectiveReadOnly.value) return
  if (isTouchDragging) {
    isTouchDragging = false
    return
  }
  openMenu(e)
}

function openMenu(event?: MouseEvent | KeyboardEvent) {
  if (isEffectiveReadOnly.value) return
  if (event) {
    const target = (event.currentTarget as HTMLElement) || (event.target as HTMLElement)
    if (target && target.getBoundingClientRect) {
      const rect = target.getBoundingClientRect()
      const popoverWidth = 275
      const popoverHeight = 380

      let left: number
      let top: number

      if (window.innerWidth < 640) {
        // Mobile / split-screen: center popover relative to card or screen, clamped
        left = Math.max(8, Math.min(rect.left - (popoverWidth - rect.width) / 2, window.innerWidth - popoverWidth - 8))
        if (rect.bottom + popoverHeight + 8 <= window.innerHeight) {
          top = rect.bottom + 4
        } else {
          top = Math.max(8, window.innerHeight - popoverHeight - 8)
        }
      } else {
        // Desktop: anchor to right of card
        left = rect.right + 6

        // If overflows viewport right, position to the left of the card
        if (left + popoverWidth > window.innerWidth - 8) {
          left = rect.left - popoverWidth - 6
        }
        if (left < 8) {
          left = 8
        }

        // If card is in bottom half of screen or overflows bottom, adjust upward cleanly
        if (rect.top + popoverHeight > window.innerHeight - 12) {
          top = Math.max(12, Math.min(rect.bottom - popoverHeight, window.innerHeight - popoverHeight - 12))
        } else {
          top = Math.max(12, rect.top)
        }
      }

      menuPosition.value = { top, left }
    }
  }
  activeMenuColor.value = props.member.color
}

function closeMenu() {
  cleanupListeners()
  if (activeMenuColor.value === props.member.color) {
    activeMenuColor.value = null
  }
}

function selectRole(role: string) {
  if (crewRoles.includes(role) && props.member.status === 'impostor') {
    return
  }
  if (impostorRoles.includes(role) && props.member.status === 'hard_clear') {
    return
  }
  if (impostorStore.isImpostorModeActive && impostorRoles.includes(role)) {
    if (props.member.role === role) {
      crewStore.setPlayerRole(props.member.color, null, false)
      impostorStore.setFellowImpostorRole(props.member.color, null)
      if (props.member.status === 'impostor') {
        crewStore.setPlayerStatus(props.member.color, 'unknown')
      }
    } else {
      crewStore.setPlayerRole(props.member.color, role, true)
      crewStore.setPlayerStatus(props.member.color, 'impostor')
      impostorStore.setFellowImpostorRole(props.member.color, role)
    }
    closeMenu()
    return
  }

  if (props.member.role === role) {
    crewStore.setPlayerRole(props.member.color, null, false)
  } else {
    crewStore.setPlayerRole(props.member.color, role, false)
  }
  closeMenu()
}

function clearRole() {
  crewStore.setPlayerRole(props.member.color, null, false)
  if (impostorStore.isImpostorModeActive) {
    impostorStore.setFellowImpostorRole(props.member.color, null)
  }
  closeMenu()
}

function toggleRoleConfirmed() {
  const willBeConfirmed = !props.member.roleConfirmed
  crewStore.toggleRoleConfirmed(props.member.color)
  if (impostorStore.isImpostorModeActive) {
    if (willBeConfirmed && isImpostorRole.value) {
      impostorStore.setFellowImpostorRole(props.member.color, props.member.role)
    } else if (!willBeConfirmed) {
      impostorStore.setFellowImpostorRole(props.member.color, null)
    }
  }
  closeMenu()
}

function setAsMyPlayer() {
  crewStore.setPlayerColor(props.member.color)
  closeMenu()
}

function handleToggleDead() {
  crewStore.togglePlayerDead(props.member.color)
  closeMenu()
}

function toggleTasksDone() {
  crewStore.setCrewMemberIsDoneWithTasks({
    member: props.member,
    isDone: !props.member.isDoneWithTasks,
  })
}

function incrementMeetings() {
  crewStore.setCrewMemberTotalMeetings({
    member: props.member,
    meetingsCount: (props.member.totalMeetingsHeld || 0) + 1,
  })
}

function decrementMeetings() {
  const current = props.member.totalMeetingsHeld || 0
  if (current > 0) {
    crewStore.setCrewMemberTotalMeetings({
      member: props.member,
      meetingsCount: current - 1,
    })
  }
}
</script>

<style scoped>
.player-card {
  position: relative;
  flex-shrink: 0;
}

.role-reveal-enter-active,
.role-reveal-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.role-reveal-enter-from,
.role-reveal-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.role-pop-badge {
  animation: role-pop 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes role-pop {
  0% {
    opacity: 0.4;
    transform: scale(0.88);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
