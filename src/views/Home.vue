<template>
  <div class="flex flex-col h-screen p-2 lg:p-8">
    <div class="flex flex-row justify-between mb-2">
      <PlayerSelector
        :currentColor="playerColor"
        @change="handleChangePlayerColor"
      />
      <CrewPool
        :crewMembers="inactiveCrewMembers"
        @changed="value => handleCrewChanged({ type: 'inactive', value })"
        class="flex-1 mx-4 rounded"
      />
      <button @click="initNewGame()" class="button button-primary">
        New game
      </button>
    </div>
    <CrewTracker
      :playerColor="playerColor"
      :innocent="crewMembersProtectedByPlayer"
      :unknown="unknownCrewMembersForPlayer"
      :suspect="crewMembersSuspectedByPlayer"
      :dead="deadCrewMembers"
      @changed="handleCrewChanged"
      class="mb-2"
    />
    <CrewStats :crewMembers="activeCrewMembersWithoutPlayer" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import allColors from "@/config/playerColors.js";

const PlayerSelector = () => import("@/components/PlayerSelector.vue");
const CrewTracker = () => import("@/components/CrewTracker.vue");
const CrewStats = () => import("@/components/CrewStats.vue");
const CrewPool = () => import("@/components/CrewPool.vue");

export default {
  name: "Home",
  components: {
    PlayerSelector,
    CrewTracker,
    CrewStats,
    CrewPool,
  },
  mounted() {
    this.initNewGame();
  },
  data() {
    return {
      // allColors,
      // playerColor: "yellow",
      /* crewMembers: {
        innocent: [],
        unknown: [],
        suspect: [],
        dead: [],
        inactive: [],
      }, */
      // crewStatsKey: (Math.random() * 1e8).toString(32),
    };
  },
  computed: {
    ...mapState("crew", ["playerColor"]),
    ...mapGetters("crew", [
      "crewMembersWithoutPlayer",
      "activeCrewMembersWithoutPlayer",
      "deadCrewMembers",
      "inactiveCrewMembers",
      "crewMembersProtectedByPlayer",
      "unknownCrewMembersForPlayer",
      "crewMembersSuspectedByPlayer",
    ]),
  },
  methods: {
    ...mapActions("crew", [
      "resetAllCrew",
      "setPlayerColor",
      "setInactiveCrewMembers",
      "setProtectedCrewMembers",
      "setUnknownCrewMembers",
      "setSuspectedCrewMembers",
      "setDeadCrewMembers",
    ]),
    initNewGame() {
      this.resetAllCrew();
      // HACK: Forces reset of the component, easy way to reset the app
      // this.crewStatsKey = (Math.random() * 1e8).toString(32);
    },
    handleChangePlayerColor(selectedColor) {
      // this.playerColor = selectedColor;
      this.setPlayerColor(selectedColor);
      this.initNewGame();
    },
    handleCrewChanged(crewChange) {
      // console.log(crewChange);
      // this.crewMembers[crewChange.type] = crewChange.value;
      if (crewChange.type === "inactive") {
        this.setInactiveCrewMembers(crewChange.value);
      } else if (crewChange.type === "innocent") {
        this.setProtectedCrewMembers(crewChange.value);
      } else if (crewChange.type === "unknown") {
        this.setUnknownCrewMembers(crewChange.value);
      } else if (crewChange.type === "suspect") {
        this.setSuspectedCrewMembers(crewChange.value);
      } else if (crewChange.type === "dead") {
        this.setDeadCrewMembers(crewChange.value);
      }
    },
  },
};
</script>
