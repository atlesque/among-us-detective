<template>
  <div class="flex w-full h-full crewpool flex-1" data-test="crew-pool">
    <Draggable
      v-model="crewMembersInPool"
      group="crewMembers"
      item-key="color"
      :disabled="isReadOnly"
      :animation="150"
      :delay="160"
      :delay-on-touch-only="true"
      :touch-start-threshold="4"
      ghost-class="sortable-ghost"
      chosen-class="sortable-chosen"
      drag-class="sortable-drag"
      fallback-class="sortable-fallback"
      class="flex flex-wrap content-start items-start gap-1 sm:gap-1.5 p-1 sm:p-1.5 w-full flex-1"
      :class="{ 'min-h-[64px] sm:min-h-[85px]': crewMembers.length === 0 }"
    >
      <template #item="{ element: member }">
        <PlayerCard
          :key="member.color"
          :member="member"
          :highlight-color-names="highlightColorNames === true"
          :show-player-names="showPlayerNames === true"
          :is-player="member.isPlayer"
          :is-read-only="isReadOnly"
          :data-test="`crew-member-${member.color}`"
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable';
import type { CrewMember } from '~/stores/crew';
import { useRoundsStore } from '~/stores/rounds';

const props = defineProps<{
  crewMembers: CrewMember[]
  highlightColorNames?: boolean
  showPlayerNames?: boolean
}>()

const emit = defineEmits<{
  changed: [value: CrewMember[]]
}>()

const roundsStore = useRoundsStore();
const isReadOnly = computed(() => roundsStore.isViewingHistory);

const crewMembersInPool = computed({
  get: () => props.crewMembers,
  set: (value: CrewMember[]) => {
    if (isReadOnly.value) return;
    emit('changed', value);
  },
})
</script>

<style lang="scss">
.crewpool {
  &.pool--dead {
    .player-name {
      @apply text-theme-gray-extra-light;
    }
  }
}

/* Floating clone that tracks the user's finger/mouse */
.sortable-fallback {
  transition: none !important;
  opacity: 0.95 !important;
  pointer-events: none !important;
  z-index: 999999 !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5) !important;
  cursor: grabbing !important;
}

/* Ghost placeholder left behind in the columns */
.sortable-ghost {
  opacity: 0.3 !important;
}

/* Chosen card */
.sortable-chosen {
  cursor: grabbing !important;
}
</style>
