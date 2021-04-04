<template>
  <div
    class="flex flex-col p-2 lg:p-8"
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

      <div class="flex justify-center flex-1">
        <button
          @click="toggleNotesModal"
          class="py-1 rounded-r-none button-sm lg:ml-2"
        >
          Notes
        </button>
        <div class="flex flex-row flex-1 max-w-xl min-h-12">
          <CrewPool
            :crewMembers="inactiveCrewMembers"
            :showColorNames="showColorNames === true"
            @changed="value => handleCrewChanged({ type: 'inactive', value })"
            @removed="
              member => handleMemberRemoved({ list: 'inactive', member })
            "
            class="flex-1 border lg:mb-0 "
          />
          <button
            :disabled="inactiveCrewMembers.length <= 0"
            @click="setAllMembersAsUnknown"
            class="rounded-l-none lg:mr-2 button-sm"
          >
            <span class="icon-arrow-down2"></span>
          </button>
        </div>
      </div>
      <div class="flex justify-between mb-2">
        <button
          @click="initNewRound()"
          class="mr-2 button button-success"
          :disabled="
            activeCrewMembersWithoutPlayer.length <= 0 ||
              unknownCrewMembersForPlayer.length ===
                activeCrewMembersWithoutPlayer.length
          "
        >
          New round
        </button>
        <PlayerSelector
          class="mr-2 lg:hidden"
          :currentColor="playerColor"
          @colorChanged="handleChangePlayerColor"
          @pickerToggle="handleTogglePlayerPicker"
          :isPickerOpen="isPlayerPickerOpen"
        />
        <button
          @click="initNewGame()"
          class="button button-primary"
          :disabled="activeCrewMembersWithoutPlayer.length <= 0"
        >
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
      :showColorNames="showColorNames"
      @changed="handleCrewChanged"
      @removed="handleMemberRemoved"
      class="mb-2 lg:mb-4"
    />
    <CrewStats
      v-show="activeCrewMembersWithoutPlayer.length > 0"
      :crewMembers="activeCrewMembersWithoutPlayer"
      :showColorNames="showColorNames"
      class="mb-2"
    />
    <div class="fixed bottom-0 left-0 right-0 z-10 flex justify-end px-2 py-1">
      <button @click="toggleSettingsModal" class="mr-2 button-sm">
        Settings
      </button>
      <button @click="toggleHelpModal" class="mr-2 button-sm">
        Help
      </button>
      <button @click="toggleAboutModal" class="button-sm">
        About
      </button>
    </div>
    <div class="relative">
      <Maps />
    </div>
    <NotesModal
      v-if="isNotesModalOpen === true"
      :round="roundNotes"
      :game="gameNotes"
      :isDarkMode="isDarkMode === true"
      @roundNotesChanged="value => (roundNotes = value)"
      @gameNotesChanged="value => (gameNotes = value)"
      @close="toggleNotesModal"
    />
    <HelpModalWithGifs
      v-if="isHelpModalOpen === true"
      @close="toggleHelpModal"
    />
    <AboutModal v-if="isAboutModalOpen === true" @close="toggleAboutModal" />
    <SettingsModal
      v-if="isSettingsModalOpen === true"
      @close="toggleSettingsModal"
    />
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
const NotesModal = () => import("@/components/NotesModal.vue");
const HelpModalWithGifs = () => import("@/components/HelpModalWithGifs.vue");
const AboutModal = () => import("@/components/AboutModal.vue");
const SettingsModal = () => import("@/components/SettingsModal.vue");
const CookieWarning = () => import("@/components/CookieWarning.vue");

export default {
  name: "Home",
  components: {
    PlayerSelector,
    CrewTracker,
    CrewStats,
    CrewPool,
    Maps,
    NotesModal,
    HelpModalWithGifs,
    AboutModal,
    SettingsModal,
    CookieWarning,
  },
  mounted() {
    this.initNewGame();
    if (JSON.parse(localStorage.getItem("returningPlayer")) !== true) {
      this.isHelpModalOpen = true;
      localStorage.setItem("returningPlayer", JSON.stringify(true));
    }
    document.addEventListener("keyup", e => {
      if (e.code === "KeyN" && this.isNotesModalOpen === false) {
        this.isNotesModalOpen = true;
      } else if (e.code === "Escape" && this.isNotesModalOpen === true) {
        this.isNotesModalOpen = false;
      }
    });
  },
  data() {
    return {
      isPlayerPickerOpen: false,
      isHelpModalOpen: false,
      isAboutModalOpen: false,
      isSettingsModalOpen: false,
      // isNotesModalOpen: false,
      roundNotes: "",
      gameNotes: "",
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
    ...mapState("darkMode", ["isDarkMode"]),
    ...mapState("notes", ["areNotesOpen"]),
    ...mapState("settings", ["showColorNames"]),
    isNotesModalOpen: {
      get() {
        return this.areNotesOpen;
      },
      set(value) {
        this.setNotesOpenState(value);
      },
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
    ...mapActions("notes", ["setNotesOpenState"]),
    initNewGame() {
      this.resetAllCrew();
      this.gameNotes = "";
      this.roundNotes = "";
      this.$gtag.event("init_new_game", {
        event_category: "global_stats",
      });
    },
    initNewRound() {
      this.resetActiveCrew();
      this.roundNotes = "";
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
          this.$gtag.event(
            `marked_as_innocent_${newMemberProtectedByPlayer.color}`,
            {
              event_category: "player_stats",
            }
          );
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
          this.$gtag.event(
            `marked_as_suspect_${newMemberSuspectedByPlayer.color}`,
            {
              event_category: "player_stats",
            }
          );
        }
        this.setSuspectedCrewMembers(crewChange.value);
      } else if (crewChange.type === "dead") {
        const newDeadMember = crewChange.value.filter(
          newMember => this.deadCrewMembers.includes(newMember) === false
        )[0];
        if (newDeadMember != null) {
          this.$gtag.event(`marked_as_dead_${newDeadMember.color}`, {
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
    toggleHelpModal() {
      const newValue = !this.isHelpModalOpen;
      this.isHelpModalOpen = newValue;
      if (newValue === true) {
        this.$gtag.event("open_help", {
          event_category: "global_stats",
        });
      }
    },
    toggleAboutModal() {
      const newValue = !this.isAboutModalOpen;
      this.isAboutModalOpen = newValue;
      if (newValue === true) {
        this.$gtag.event("open_changelog", {
          event_category: "global_stats",
        });
      }
    },
    toggleSettingsModal() {
      const newValue = !this.isSettingsModalOpen;
      this.isSettingsModalOpen = newValue;
      if (newValue === true) {
        this.$gtag.event("open_settings", {
          event_category: "global_stats",
        });
      }
    },
    toggleNotesModal() {
      const newValue = !this.isNotesModalOpen;
      this.isNotesModalOpen = newValue;
      if (newValue === true) {
        this.$gtag.event("open_notes", {
          event_category: "global_stats",
        });
      }
    },
  },
};
</script>
