<template>
  <div
    class="flex flex-col h-screen p-2 lg:p-8"
    :class="{ 'dark-mode': isDarkMode === true }"
  >
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
        :showColorNames="areColorNamesVisible === true"
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
      :areColorNamesVisible="areColorNamesVisible"
      @changed="handleCrewChanged"
      @removed="handleMemberRemoved"
      class="mb-2"
    />
    <CrewStats
      v-show="activeCrewMembersWithoutPlayer.length > 0"
      :crewMembers="activeCrewMembersWithoutPlayer"
      :areColorNamesVisible="areColorNamesVisible"
      class="mb-2"
    />
    <div class="fixed bottom-0 left-0 right-0 flex justify-end p-1">
      <button @click="toggleColorNames" class="mr-2 text-xs button-sm">
        {{ toggleColorNamesButtonText }}
      </button>
      <button @click="toggleDarkMode" class="text-xs button-sm">
        {{ toggleDarkModeButtonText }}
      </button>
    </div>
    <Maps />
    <CookieWarning />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

const PlayerSelector = () => import("@/components/PlayerSelector.vue");
const CrewTracker = () => import("@/components/CrewTracker.vue");
const CrewStats = () => import("@/components/CrewStats.vue");
const CrewPool = () => import("@/components/CrewPool.vue");
const Maps = () => import("@/components/Maps.vue");
const CookieWarning = () => import("@/components/CookieWarning.vue");

export default {
  name: "Home",
  components: {
    PlayerSelector,
    CrewTracker,
    CrewStats,
    CrewPool,
    Maps,
    CookieWarning,
  },
  mounted() {
    this.initNewGame();
  },
  data() {
    return {
      isPlayerPickerOpen: false,
      areColorNamesVisible: false,
      isDarkMode: false,
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
    toggleColorNamesButtonText() {
      return this.areColorNamesVisible === true
        ? "Player icons"
        : "Color names";
    },
    toggleDarkModeButtonText() {
      return this.isDarkMode === true ? "Light" : "Dark";
    },
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
      this.$gtag.event("init_new_game", {
        event_category: "global_stats",
      });
    },
    initNewRound() {
      this.resetActiveCrew();
      this.$gtag.event("init_new_round", {
        event_category: "global_stats",
      });
    },
    handleChangePlayerColor(selectedColor) {
      this.setPlayerColor(selectedColor);
      this.initNewGame();
      this.$gtag.event(`change_player_color_${selectedColor}`, {
        event_category: "player_stats",
      });
    },
    handleCrewChanged(crewChange) {
      if (crewChange.type === "inactive") {
        this.setInactiveCrewMembers(crewChange.value);
      } else if (crewChange.type === "innocent") {
        const newMemberProtectedByPlayer = crewChange.value.filter(
          newMember =>
            this.crewMembersProtectedByPlayer.includes(newMember) === false
        )[0];
        if (newMemberProtectedByPlayer != null) {
          this.$gtag.event(`marked_as_innocent_${newMemberProtectedByPlayer}`, {
            event_category: "player_stats",
          });
        }
        this.setProtectedCrewMembers(crewChange.value);
      } else if (crewChange.type === "unknown") {
        this.setUnknownCrewMembers(crewChange.value);
      } else if (crewChange.type === "suspect") {
        const newMemberSuspectedByPlayer = crewChange.value.filter(
          newMember =>
            this.crewMembersSuspectedByPlayer.includes(newMember) === false
        )[0];
        if (newMemberSuspectedByPlayer != null) {
          this.$gtag.event(`marked_as_suspect_${newMemberSuspectedByPlayer}`, {
            event_category: "player_stats",
          });
        }
        this.setSuspectedCrewMembers(crewChange.value);
      } else if (crewChange.type === "dead") {
        const newDeadMember = crewChange.value.filter(
          newMember => this.deadCrewMembers.includes(newMember) === false
        )[0];
        if (newDeadMember != null) {
          this.$gtag.event(`marked_as_dead_${newDeadMember}`, {
            event_category: "global_stats",
          });
        }
        this.setDeadCrewMembers(crewChange.value);
      }
    },
    handleMemberRemoved({ list, member }) {
      if (list === "inactive") {
        this.setMemberAsUnknown(member);
      } else if (list === "innocent") {
        this.setMemberAsUnknown(member);
      } else if (list === "unknown") {
        this.setMemberAsInactive(member);
      } else if (list === "suspect") {
        this.setMemberAsUnknown(member);
      } else if (list === "dead") {
        this.setMemberAsUnknown(member);
      }
    },
    handleTogglePlayerPicker(isOpen) {
      this.isPlayerPickerOpen = isOpen;
    },
    toggleColorNames() {
      const newValue = !this.areColorNamesVisible;
      this.areColorNamesVisible = newValue;
      const eventName =
        newValue === true ? "show_color_names" : "hide_color_names";
      this.$gtag.event(eventName, {
        event_category: "global_stats",
      });
    },
    toggleDarkMode() {
      const newValue = !this.isDarkMode;
      this.isDarkMode = newValue;
      const eventName =
        newValue === true ? "dark_mode_enabled" : "light_mode_enabled";
      this.$gtag.event(eventName, {
        event_category: "global_stats",
      });
    },
  },
};
</script>
