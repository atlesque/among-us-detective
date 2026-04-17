<template>
  <div class="flex w-full h-full crewpool" data-test="crew-pool">
    <Draggable
      v-model="crewMembersInPool"
      :group="{ name: 'crewMembers', pull: 'clone' }"
      item-key="color"
      class="flex-1 px-2 pt-2"
    >
      <template #item="{ element: member }">
        <CrewIcon
          :key="member.color"
          :color="member.color"
          :show-color-name="showColorNames === true"
          :show-player-name="showPlayerNames === true"
          :is-imposter="member.isImposter"
          :is-player="member.isPlayer"
          :player-name="member.playerName"
          :data-test="`crew-member-${member.color}`"
          class="float-left mb-2 mr-2"
          @dblclick="removeMember(member)"
        />
      </template>
    </Draggable>
  </div>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable';
import type { CrewMember } from '~/app/stores/crew';

const props = defineProps<{
  crewMembers: CrewMember[]
  showColorNames?: boolean
  showPlayerNames?: boolean
}>()

const emit = defineEmits<{
  changed: [value: CrewMember[]]
  removed: [member: CrewMember]
}>()

const crewMembersInPool = computed({
  get: () => props.crewMembers,
  set: (value: CrewMember[]) => emit('changed', value),
})

function removeMember(member: CrewMember) {
  emit('removed', member)
}
</script>

<style lang="scss">
.crewpool {
  &.pool--dead {
    .player-name {
      @apply text-theme-gray-extra-light;
    }
  }
}
</style>
