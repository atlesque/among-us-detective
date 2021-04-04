<template>
  <div class="crew-tracker">
    <table class="w-full overflow-hidden rounded shadow table-fixed">
      <thead>
        <tr>
          <th class="bg-theme-green-light dark--text-dark">My innocents</th>
          <th class="unknown-column">Unknown</th>
          <th class="bg-theme-yellow-light dark--text-dark">My suspects</th>
          <th class="text-theme-red-light bg-theme-gray-dark">Dead</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <CrewPool
              class="pool--innocent"
              :crewMembers="innocentList"
              :showColorNames="showColorNames === true"
              @changed="value => (innocentList = value)"
              @removed="
                member => handleRemoveMember({ list: 'innocent', member })
              "
            />
          </td>
          <td>
            <CrewPool
              class="pool--unknown"
              :crewMembers="unknownList"
              :showColorNames="showColorNames === true"
              @changed="value => (unknownList = value)"
              @removed="
                member => handleRemoveMember({ list: 'unknown', member })
              "
            />
          </td>
          <td>
            <CrewPool
              class="pool--suspect"
              :crewMembers="suspectList"
              :showColorNames="showColorNames === true"
              @changed="value => (suspectList = value)"
              @removed="
                member => handleRemoveMember({ list: 'suspect', member })
              "
            />
          </td>
          <td class="bg-theme-gray-dark">
            <CrewPool
              class="pool--dead"
              :crewMembers="deadList"
              :showColorNames="showColorNames === true"
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
    showColorNames: {
      type: Boolean,
      default: false,
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
  thead {
    th {
      @apply p-1;
    }
  }

  td {
    @apply shadow-inner;
  }

  td {
    height: 3rem;
  }
}
.draggable-wrapper {
  height: 100%;
}
</style>
