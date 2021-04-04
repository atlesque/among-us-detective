<template>
  <div class="flex">
    <Modal @close="handleCloseEvent">
      <template v-if="isEditingPlayerNames === true">
        <template slot="title">Player names</template>
        <template slot="body">
          <div class="flex justify-between my-4">
            <!-- <button class="button-sm button-success" @click="handleCloseEvent">
              Save & return
            </button> -->
            <button
              class="button-sm button-danger"
              @click="resetAllPlayerNames"
            >
              Reset all
            </button>
          </div>
          <table class="w-full table-auto settings-list">
            <tbody>
              <tr v-for="(color, index) in playerColors" :key="index">
                <td>
                  <div class="flex items-center">
                    <CrewIcon :color="color" class="mr-2" />
                    <span class="capitalize">{{ color }}</span>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    class="p-2 mb-0 text-xs"
                    :placeholder="color"
                    :value="getPlayerName(color)"
                    @input="setPlayerName(color, $event.target.value)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </template>
      <template v-else>
        <template slot="title">Settings</template>
        <template slot="body">
          <table class="w-full table-fixed settings-list">
            <tbody>
              <tr>
                <td>Show players as:</td>
                <td>
                  <button @click="toggleColorNames" class="button-sm">
                    {{ toggleColorNamesButtonText }}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Interface theme:</td>
                <td>
                  <button @click="toggleDarkMode" class="button-sm">
                    {{ toggleDarkModeButtonText }}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Show Imposter checkbox:</td>
                <td>
                  <Checkbox
                    :isChecked="isImposterCheckboxVisible"
                    @changed="value => (isImposterCheckboxVisible = value)"
                  />
                </td>
              </tr>
              <tr>
                <td>Show Tasks checkbox:</td>
                <td>
                  <Checkbox
                    :isChecked="isTasksCheckboxVisible"
                    @changed="value => (isTasksCheckboxVisible = value)"
                  />
                </td>
              </tr>
              <tr>
                <td>Show Meetings count:</td>
                <td>
                  <Checkbox
                    :isChecked="isMeetingsCountVisible"
                    @changed="value => (isMeetingsCountVisible = value)"
                  />
                </td>
              </tr>
              <tr>
                <td>Show player names:</td>
                <td>
                  <div class="flex">
                    <Checkbox
                      :isChecked="arePlayerNamesVisible"
                      @changed="value => (arePlayerNamesVisible = value)"
                    />
                    <button
                      v-if="arePlayerNamesVisible === true"
                      @click="isEditingPlayerNames = true"
                      class="button-sm"
                    >
                      Edit names
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Reset notes each game:</td>
                <td>
                  <Checkbox
                    :isChecked="areNotesResetOnNewGame"
                    @changed="value => (areNotesResetOnNewGame = value)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script>
import playerColors from "@/config/playerColors.js";
import { mapState, mapActions } from "vuex";
const Modal = () => import("@/components/Modal.vue");
const Checkbox = () => import("@/components/Checkbox.vue");
const CrewIcon = () => import("@/components/CrewIcon.vue");

export default {
  name: "SettingsModal",
  components: {
    Modal,
    Checkbox,
    CrewIcon,
  },
  data() {
    return {
      isEditingPlayerNames: false,
      playerColors,
    };
  },
  computed: {
    ...mapState("settings", [
      "showColorNames",
      "showImposterCheckbox",
      "showTasksCheckbox",
      "showMeetingsCount",
      "showPlayerNames",
    ]),
    ...mapState("darkMode", ["isDarkMode"]),
    ...mapState("crew", ["crewMembers"]),
    ...mapState("notes", ["resetNotesOnNewGame"]),
    areColorNamesVisible: {
      get() {
        return this.showColorNames;
      },
      set(value) {
        this.setShowColorNames(value);
      },
    },
    isImposterCheckboxVisible: {
      get() {
        return this.showImposterCheckbox;
      },
      set(value) {
        this.setShowImposterCheckbox(value);
      },
    },
    isTasksCheckboxVisible: {
      get() {
        return this.showTasksCheckbox;
      },
      set(value) {
        this.setShowTasksCheckbox(value);
      },
    },
    isMeetingsCountVisible: {
      get() {
        return this.showMeetingsCount;
      },
      set(value) {
        this.setShowMeetingsCount(value);
      },
    },
    arePlayerNamesVisible: {
      get() {
        return this.showPlayerNames;
      },
      set(value) {
        this.setShowPlayerNames(value);
      },
    },
    areNotesResetOnNewGame: {
      get() {
        return this.resetNotesOnNewGame;
      },
      set(value) {
        this.setResetNotesOnNewGame(value);
      },
    },
    toggleColorNamesButtonText() {
      return this.areColorNamesVisible === true ? "Color names" : "Icons";
    },
    toggleDarkModeButtonText() {
      return this.isDarkMode === true ? "Dark" : "Light";
    },
  },
  methods: {
    ...mapActions("settings", [
      "setShowColorNames",
      "setShowImposterCheckbox",
      "setShowTasksCheckbox",
      "setShowMeetingsCount",
      "setShowPlayerNames",
    ]),
    ...mapActions("darkMode", ["setDarkMode"]),
    ...mapActions("crew", ["setCrewMemberPlayerName", "resetAllPlayerNames"]),
    ...mapActions("notes", ["setResetNotesOnNewGame"]),
    handleCloseEvent() {
      if (this.isEditingPlayerNames === true) {
        this.isEditingPlayerNames = false;
      } else {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close");
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
      this.setDarkMode(newValue);
      const eventName =
        newValue === true ? "dark_mode_enabled" : "light_mode_enabled";
      this.$gtag.event(eventName, {
        event_category: "global_stats",
      });
    },
    getPlayerName(color) {
      return this.crewMembers.find(member => member.color === color).playerName;
    },
    setPlayerName(color, playerName) {
      this.setCrewMemberPlayerName({ color, playerName });
    },
  },
};
</script>
<style lang="scss">
.settings-list {
  td {
    @apply pr-2;
    @apply py-1;
  }
  .crew-icon svg {
    position: relative;
    max-height: 100%;
    top: -5px;
  }
}
</style>
