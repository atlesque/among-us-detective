<template>
  <div class="flex flex-col justify-between h-screen p-2 lg:p-8">
    <div class="flex flex-row justify-between mb-2">
      <PlayerSelector :currentColor="playerColor" @change="setPlayerColor" />
      <button @click="initNewGame()" class="self-start button button-primary">
        New game
      </button>
    </div>
    <CrewTracker
      :playerColor="playerColor"
      :innocent="crewMembers.innocent"
      :unknown="crewMembers.unknown"
      :suspect="crewMembers.suspect"
      :dead="crewMembers.dead"
      @changed="handleCrewChanged"
    />
    <CrewStats
      :key="crewStatsKey"
      :crewMembers="allCrewMembers"
      :deadMembers="deadCrewMembers"
    />
  </div>
</template>

<script>
import allColors from "@/config/playerColors.js";

const PlayerSelector = () => import("@/components/PlayerSelector.vue");
const CrewTracker = () => import("@/components/CrewTracker.vue");
const CrewStats = () => import("@/components/CrewStats.vue");

export default {
  name: "Home",
  components: {
    PlayerSelector,
    CrewTracker,
    CrewStats,
  },
  mounted() {
    this.initNewGame();
  },
  data() {
    return {
      allColors,
      playerColor: "yellow",
      crewMembers: {
        innocent: [],
        unknown: [],
        suspect: [],
        dead: [],
      },
      crewStatsKey: (Math.random() * 1e8).toString(32),
    };
  },
  computed: {
    allCrewMembers() {
      return this.allColors.filter(color => color !== this.playerColor);
    },
    deadCrewMembers() {
      return this.allCrewMembers.filter(
        color => this.crewMembers.dead.includes(color) === false
      );
    },
  },
  methods: {
    initNewGame() {
      this.crewMembers = {
        innocent: [],
        unknown: this.allCrewMembers,
        suspect: [],
        dead: [],
      };
      // HACK: Forces reset of the component, easy way to reset the app
      this.crewStatsKey = (Math.random() * 1e8).toString(32);
    },
    setPlayerColor(selectedColor) {
      this.playerColor = selectedColor;
      this.initNewGame();
    },
    handleCrewChanged(crewChange) {
      this.crewMembers[crewChange.type] = crewChange.value;
    },
  },
};
</script>
