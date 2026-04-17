<template>
  <div class="flex">
    <Modal @close="handleCloseEvent">
      <template #title>{{
        isEditingPlayerNames ? "Player names" : "Settings"
      }}</template>
      <template #body>
        <template v-if="isEditingPlayerNames">
          <div class="flex justify-between my-4">
            <button
              class="button-sm button-danger"
              @click="crewStore.resetAllPlayerNames()"
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
                    @input="
                      (e: Event) =>
                        crewStore.setCrewMemberPlayerName({
                          color,
                          playerName: (e.target as HTMLInputElement).value,
                        })
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else>
          <table class="w-full table-fixed settings-list">
            <tbody>
              <tr data-test="setting-show-players-as">
                <td>Show players as:</td>
                <td>
                  <button
                    class="button-sm"
                    data-test="setting-show-players-as-btn"
                    @click="toggleColorNames"
                  >
                    {{ settingsStore.showColorNames ? "Color names" : "Icons" }}
                  </button>
                </td>
              </tr>
              <tr data-test="setting-theme">
                <td>Interface theme:</td>
                <td>
                  <button
                    class="button-sm"
                    data-test="setting-theme-btn"
                    @click="toggleDarkMode"
                  >
                    {{ darkModeStore.isDarkMode ? "Dark" : "Light" }}
                  </button>
                </td>
              </tr>
              <tr data-test="setting-show-imposter">
                <td>Show Imposter checkbox:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.showImposterCheckbox"
                    @changed="settingsStore.setShowImposterCheckbox"
                  />
                </td>
              </tr>
              <tr data-test="setting-show-tasks">
                <td>Show Tasks checkbox:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.showTasksCheckbox"
                    @changed="settingsStore.setShowTasksCheckbox"
                  />
                </td>
              </tr>
              <tr data-test="setting-show-meetings">
                <td>Show Meetings count:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.showMeetingsCount"
                    @changed="settingsStore.setShowMeetingsCount"
                  />
                </td>
              </tr>
              <tr data-test="setting-show-player-names">
                <td>Show player names:</td>
                <td>
                  <div class="flex">
                    <Checkbox
                      :is-checked="settingsStore.showPlayerNames"
                      @changed="settingsStore.setShowPlayerNames"
                    />
                    <button
                      v-if="settingsStore.showPlayerNames"
                      class="button-sm"
                      data-test="edit-player-names-btn"
                      @click="isEditingPlayerNames = true"
                    >
                      Edit names
                    </button>
                  </div>
                </td>
              </tr>
              <tr data-test="setting-reset-notes">
                <td>Reset notes each game:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.resetNotesOnNewGame"
                    @changed="settingsStore.setResetNotesOnNewGame"
                  />
                </td>
              </tr>
              <tr data-test="setting-show-round-notes">
                <td>Show round notes:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.showRoundNotes"
                    @changed="settingsStore.setShowRoundNotes"
                  />
                </td>
              </tr>
              <tr data-test="setting-track-own-color">
                <td>Can track own color:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.canTrackOwnColor"
                    @changed="settingsStore.setCanTrackOwnColor"
                  />
                </td>
              </tr>
              <tr data-test="setting-improve-map-contrast">
                <td>Improve map contrast:</td>
                <td>
                  <Checkbox
                    :is-checked="settingsStore.isImproveMapContrastEnabled"
                    @changed="settingsStore.setIsImproveMapContrastEnabled"
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

<script setup lang="ts">
import playerColors from "~/utils/playerColors.js";

const emit = defineEmits<{ close: [] }>();

const settingsStore = useSettingsStore();
const darkModeStore = useDarkModeStore();
const crewStore = useCrewStore();
const { gtag } = useGtag();

const isEditingPlayerNames = ref(false);

function getPlayerName(color: string): string {
  return crewStore.crewMembers.find((m) => m.color === color)?.playerName ?? "";
}

function handleCloseEvent() {
  if (isEditingPlayerNames.value) {
    isEditingPlayerNames.value = false;
  } else {
    emit("close");
  }
}

function toggleColorNames() {
  const newValue = !settingsStore.showColorNames;
  settingsStore.setShowColorNames(newValue);
  gtag("event", newValue ? "show_color_names" : "hide_color_names", {
    event_category: "global_stats",
  });
}

function toggleDarkMode() {
  const newValue = !darkModeStore.isDarkMode;
  darkModeStore.setDarkMode(newValue);
  gtag("event", newValue ? "dark_mode_enabled" : "light_mode_enabled", {
    event_category: "global_stats",
  });
}
</script>

<style lang="scss">
.settings-list {
  td {
    @apply pr-2 py-1;
  }
  .crew-icon svg {
    position: relative;
    max-height: 100%;
    top: -5px;
  }
}
</style>
