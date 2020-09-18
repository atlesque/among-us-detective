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
            <!-- <Draggable
              v-model="innocentList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="crewMember in innocentList"
                :key="crewMember.color"
                :color="crewMember.color"
                class="float-left mb-2 mr-2"
              />
            </Draggable> -->
            <CrewPool
              :crewMembers="innocentList"
              @changed="value => (innocentList = value)"
            />
          </td>
          <td>
            <!-- <Draggable
              v-model="unknownList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="crewMember in unknownList"
                :key="crewMember.color"
                :color="crewMember.color"
                class="float-left mb-2 mr-2"
              />
            </Draggable> -->
            <CrewPool
              :crewMembers="unknownList"
              @changed="value => (unknownList = value)"
            />
          </td>
          <td>
            <!-- <Draggable
              v-model="suspectList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="crewMember in suspectList"
                :key="crewMember.color"
                :color="crewMember.color"
                class="float-left mb-2 mr-2"
              />
            </Draggable> -->
            <CrewPool
              :crewMembers="suspectList"
              @changed="value => (suspectList = value)"
            />
          </td>
          <td>
            <!-- <Draggable
              v-model="deadList"
              group="crewMembers"
              class="draggable-wrapper"
            >
              <CrewIcon
                v-for="crewMember in deadList"
                :key="crewMember.color"
                :color="crewMember.color"
                class="float-left mb-2 mr-2"
              />
            </Draggable> -->
            <CrewPool
              :crewMembers="deadList"
              @changed="value => (deadList = value)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* import Draggable from "vuedraggable";

const CrewIcon = () => import("@/components/CrewIcon.vue"); */
const CrewPool = () => import("@/components/CrewPool.vue");

export default {
  name: "CrewTracker",
  components: {
    /* Draggable,
    CrewIcon, */
    CrewPool,
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
        return [...this.innocent].sort((a, b) => {
          let result = 0;
          if (a.color > b.color) {
            result = 1;
          } else if (a.color < b.color) {
            result = -1;
          }
          return result;
        });
      },
      set(value) {
        this.$emit("changed", { type: "innocent", value });
      },
    },
    unknownList: {
      get() {
        return [...this.unknown].sort((a, b) => {
          let result = 0;
          if (a.color > b.color) {
            result = 1;
          } else if (a.color < b.color) {
            result = -1;
          }
          return result;
        });
      },
      set(value) {
        this.$emit("changed", { type: "unknown", value });
      },
    },
    suspectList: {
      get() {
        return [...this.suspect].sort((a, b) => {
          let result = 0;
          if (a.color > b.color) {
            result = 1;
          } else if (a.color < b.color) {
            result = -1;
          }
          return result;
        });
      },
      set(value) {
        this.$emit("changed", { type: "suspect", value });
      },
    },
    deadList: {
      get() {
        return [...this.dead].sort((a, b) => {
          let result = 0;
          if (a.color > b.color) {
            result = 1;
          } else if (a.color < b.color) {
            result = -1;
          }
          return result;
        });
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
