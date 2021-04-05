<template>
  <div class="flex w-full h-full crewpool">
    <Draggable
      v-model="crewMembersInPool"
      :group="{ name: 'crewMembers', pull: 'clone' }"
      class="flex-1 px-2 pt-2"
    >
      <CrewIcon
        v-for="member in crewMembersInPool"
        :key="member.color"
        :color="member.color"
        :showColorName="showColorNames === true"
        :showPlayerName="showPlayerNames === true"
        :is-imposter="member.isImposter"
        :is-player="member.isPlayer"
        :player-name="member.playerName"
        class="float-left mb-2 mr-2"
        v-on:dblclick.native="removeMember(member)"
      />
    </Draggable>
  </div>
</template>
<script>
import Draggable from "vuedraggable";

const CrewIcon = () => import("@/components/CrewIcon.vue");

export default {
  name: "CrewPool",
  components: {
    Draggable,
    CrewIcon,
  },
  props: {
    crewMembers: {
      type: Array,
      required: true,
    },
    showColorNames: {
      type: Boolean,
      default: false,
    },
    showPlayerNames: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    crewMembersInPool: {
      get() {
        return this.crewMembers;
      },
      set(value) {
        this.$emit("changed", value);
      },
    },
  },
  methods: {
    removeMember(memberToRemove) {
      this.$emit("removed", memberToRemove);
    },
  },
};
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
