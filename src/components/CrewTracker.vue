<template>
  <div>
    <table class="w-full table-fixed table-bordered">
      <thead>
        <tr>
          <th class="bg-theme-green-light">Innocent</th>
          <th>Unknown</th>
          <th class="bg-theme-yellow-light">Suspect</th>
          <th class="text-theme-red-light bg-theme-gray-dark">Dead</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CrewPool
              :crewMembers="innocentList"
              @changed="value => (innocentList = value)"
              @removed="
                member => handleRemoveMember({ list: 'innocent', member })
              "
            />
          </td>
          <td>
            <CrewPool
              :crewMembers="unknownList"
              @changed="value => (unknownList = value)"
              @removed="
                member => handleRemoveMember({ list: 'unknown', member })
              "
            />
          </td>
          <td>
            <CrewPool
              :crewMembers="suspectList"
              @changed="value => (suspectList = value)"
              @removed="
                member => handleRemoveMember({ list: 'suspect', member })
              "
            />
          </td>
          <td class="bg-theme-gray-dark">
            <CrewPool
              :crewMembers="deadList"
              @changed="value => (deadList = value)"
              @removed="member => handleRemoveMember({ list: 'dead', member })"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
const CrewPool = () => import("@/components/CrewPool.vue");

export default {
  name: "CrewTracker",
  components: {
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
  methods: {
    handleRemoveMember({ list, member }) {
      this.$emit("removed", { list, member });
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  td {
    height: 3rem;
  }
}
.draggable-wrapper {
  height: 100%;
}
</style>
