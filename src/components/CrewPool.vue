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
        :showColorNames="showColorNames"
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
      /* console.log(memberToRemove);
      this.crewMembersInPool = this.crewMembersInPool.filter(member => {
        return member.color !== memberToRemove.color;
      }); */
    },
  },
};
</script>
