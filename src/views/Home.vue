<template>
  <div class="flex flex-col h-screen p-2 lg:p-8">
    <div class="flex flex-col-reverse justify-between mb-2 lg:flex-row">
      <PlayerSelector
        class="hidden lg:flex"
        :currentColor="playerColor"
        @colorChanged="handleChangePlayerColor"
        @pickerToggle="handleTogglePlayerPicker"
        :isPickerOpen="isPlayerPickerOpen"
      />
      <CrewPool
        :crewMembers="inactiveCrewMembers"
        @changed="value => handleCrewChanged({ type: 'inactive', value })"
        @removed="member => handleMemberRemoved({ list: 'inactive', member })"
        class="flex-1 mb-2 border rounded-l lg:mb-0 lg:ml-4"
      />
      <button
        :disabled="inactiveCrewMembers.length <= 0"
        @click="setAllMembersAsUnknown"
        class="mr-2 rounded-l-none button-sm"
      >
        <span class="icon-arrow-down2"></span>
      </button>
      <div class="flex justify-between h-full mb-2">
        <button @click="initNewRound()" class="mr-2 button button-success">
          New round
        </button>
        <PlayerSelector
          class="lg:hidden"
          :currentColor="playerColor"
          @colorChanged="handleChangePlayerColor"
          @pickerToggle="handleTogglePlayerPicker"
          :isPickerOpen="isPlayerPickerOpen"
        />
        <button @click="initNewGame()" class="button button-primary">
          New game
        </button>
      </div>
    </div>
    <CrewTracker
      :playerColor="playerColor"
      :innocent="crewMembersProtectedByPlayer"
      :unknown="unknownCrewMembersForPlayer"
      :suspect="crewMembersSuspectedByPlayer"
      :dead="deadCrewMembers"
      @changed="handleCrewChanged"
      @removed="handleMemberRemoved"
      class="mb-2"
    />
    <CrewStats :crewMembers="activeCrewMembersWithoutPlayer" class="mb-2" />
    <Maps />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
// import allColors from "@/config/playerColors.js";

const PlayerSelector = () => import("@/components/PlayerSelector.vue");
const CrewTracker = () => import("@/components/CrewTracker.vue");
const CrewStats = () => import("@/components/CrewStats.vue");
const CrewPool = () => import("@/components/CrewPool.vue");
const Maps = () => import("@/components/Maps.vue");

export default {
  name: "Home",
  components: {
    PlayerSelector,
    CrewTracker,
    CrewStats,
    CrewPool,
    Maps,
  },
  mounted() {
    this.initNewGame();
  },
  data() {
    return {
      isPlayerPickerOpen: false,
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
      "resetActiveCrew",
      "setPlayerColor",
      "setInactiveCrewMembers",
      "setProtectedCrewMembers",
      "setUnknownCrewMembers",
      "setSuspectedCrewMembers",
      "setDeadCrewMembers",
      "setMemberAsUnknown",
      "setMemberAsInactive",
      "setAllMembersAsUnknown",
    ]),
    initNewGame() {
      this.resetAllCrew();
      // HACK: Forces reset of the component, easy way to reset the app
      // this.crewStatsKey = (Math.random() * 1e8).toString(32);
    },
    initNewRound() {
      this.resetActiveCrew();
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
    handleMemberRemoved({ list, member }) {
      if (list === "inactive") {
        // this.setInactiveCrewMembers(member);
        this.setMemberAsUnknown(member);
      } else if (list === "innocent") {
        // this.setProtectedCrewMembers(member);
        this.setMemberAsUnknown(member);
      } else if (list === "unknown") {
        // this.setUnknownCrewMembers(member);
        this.setMemberAsInactive(member);
      } else if (list === "suspect") {
        this.setMemberAsUnknown(member);
        // this.setSuspectedCrewMembers(member);
      } else if (list === "dead") {
        this.setMemberAsUnknown(member);
        // this.setDeadCrewMembers(member);
      }
    },
    handleTogglePlayerPicker(isOpen) {
      this.isPlayerPickerOpen = isOpen;
    },
  },
};
</script>
