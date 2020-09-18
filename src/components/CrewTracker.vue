<template>
  <div>
    <table class="w-full table-fixed table-bordered">
      <thead>
        <tr>
          <th>Innocent</th>
          <th>Unknown</th>
          <th>Suspect</th>
          <th>Dead</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Draggable
              v-model="innocentList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="color in innocent"
                :key="color"
                :color="color"
                class="float-left mb-2 mr-2"
              />
            </Draggable>
          </td>
          <td>
            <Draggable
              v-model="unknownList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="color in unknown"
                :key="color"
                :color="color"
                class="float-left mb-2 mr-2"
              />
            </Draggable>
          </td>
          <td>
            <Draggable
              v-model="suspectList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="color in suspect"
                :key="color"
                :color="color"
                class="float-left mb-2 mr-2"
              />
            </Draggable>
          </td>
          <td>
            <Draggable
              v-model="deadList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="color in dead"
                :key="color"
                :color="color"
                class="float-left mb-2 mr-2"
              />
            </Draggable>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Draggable from "vuedraggable";

const CrewIcon = () => import("@/components/CrewIcon.vue");

export default {
  name: "CrewTracker",
  components: {
    CrewIcon,
    Draggable,
  },
  props: {
    playerColor: {
      type: String,
      required: true,
    },
    innocent: {
      type: Array,
      required: true,
    },
    unknown: {
      type: Array,
      required: true,
    },
    suspect: {
      type: Array,
      required: true,
    },
    dead: {
      type: Array,
      required: true,
    },
  },
  computed: {
    innocentList: {
      get() {
        return this.innocent;
      },
      set(value) {
        this.$emit("changed", { type: "innocent", value });
      },
    },
    unknownList: {
      get() {
        return this.unknown;
      },
      set(value) {
        this.$emit("changed", { type: "unknown", value });
      },
    },
    suspectList: {
      get() {
        return this.suspect;
      },
      set(value) {
        this.$emit("changed", { type: "suspect", value });
      },
    },
    deadList: {
      get() {
        return this.dead;
      },
      set(value) {
        this.$emit("changed", { type: "dead", value });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  td {
    height: 0; // HACK: Makes all <td> equal height
  }
}
.draggable-wrapper {
  height: 100%;
}
</style>
