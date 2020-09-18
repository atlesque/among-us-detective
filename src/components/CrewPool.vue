<template>
  <div class="flex border border-black">
    <Draggable
      v-model="crewMembers"
      group="crewMembers"
      class="flex-1 px-2 pt-2"
    >
      <CrewIcon
        v-for="color in crewMembers"
        :key="color"
        :color="color"
        class="float-left mb-2 mr-2"
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
  data() {
    return {
      crewMembers: [],
    };
  },
};
</script>
