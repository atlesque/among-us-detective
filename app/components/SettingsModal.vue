<template>
  <div class="flex">
    <Modal @close="handleCloseEvent">
      <template #title>{{
        isEditingPlayerNames ? t('settings.playerNamesTitle') : t('settings.title')
      }}</template>
      <template #body>
        <!-- Player Names Editor Sub-View -->
        <template v-if="isEditingPlayerNames">
          <div class="flex justify-between items-center my-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('settings.editNicknames') }}</span>
            <button
              class="px-2.5 py-1 text-xs font-bold rounded bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/25 border border-red-200 dark:border-red-500/30 transition-colors"
              @click="crewStore.resetAllPlayerNames()"
            >
              {{ t('settings.resetAll') }}
            </button>
          </div>
          <div class="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            <div
              v-for="(color, index) in playerColors"
              :key="index"
              class="flex items-center gap-2 px-2 py-1.5 rounded bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60"
            >
              <CrewIcon :color="color" class="w-5 h-5 shrink-0" />
              <span class="text-xs font-medium capitalize text-gray-600 dark:text-gray-400 w-14 shrink-0">{{ tColor(color) }}</span>
              <input
                type="text"
                class="flex-1 px-2 py-1 text-xs rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                :placeholder="tColor(color)"
                :value="getPlayerName(color)"
                @input="
                  (e: Event) =>
                    crewStore.setCrewMemberPlayerName({
                      color,
                      playerName: (e.target as HTMLInputElement).value,
                    })
                "
              />
            </div>
          </div>
        </template>

        <!-- Main Settings -->
        <template v-else>
          <div class="space-y-2 mt-2">
            <!-- Display -->
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{{ t('settings.display') }}</div>

            <!-- UI Language -->
            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-ui-language"
            >
              <div class="flex flex-col">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.interfaceLanguage') }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ settingsStore.uiLanguage === 'auto' ? `Auto: ${detectedLocaleInfo.name}` : locale }}
                </span>
              </div>
              <select
                :value="settingsStore.uiLanguage"
                class="px-2 py-1 text-xs rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                data-test="select-ui-language"
                @change="(e: Event) => setLocale((e.target as HTMLSelectElement).value as any)"
              >
                <option value="auto">
                  🌐 Auto ({{ detectedLocaleInfo.name }})
                </option>
                <option v-for="l in availableLocales" :key="l.code" :value="l.code">
                  {{ l.flag }} {{ l.name }}
                </option>
              </select>
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-theme"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.interfaceTheme') }}</span>
              <button
                class="px-2.5 py-1 text-xs font-bold rounded transition-colors inline-flex items-center gap-1.5"
                :class="darkModeStore.isDarkMode
                  ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/40'
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300 shadow-2xs'"
                data-test="setting-theme-btn"
                @click="toggleDarkMode"
              >
                <AppIcon :name="darkModeStore.isDarkMode ? 'moon' : 'sun'" class="w-3.5 h-3.5 shrink-0" />
                <span>{{ darkModeStore.isDarkMode ? t('settings.themeDark') : t('settings.themeLight') }}</span>
              </button>
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-disable-animations"
            >
              <div class="flex flex-col">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.disableAnimations') }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ t('settings.disableAnimationsSub') }}</span>
              </div>
              <Checkbox
                :is-checked="settingsStore.disableAnimations"
                @changed="settingsStore.setDisableAnimations"
              />
            </div>

            <div
              class="flex flex-col gap-1.5 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-board-zoom"
            >
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.boardZoom') }}</span>
                  <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ t('settings.cardBeanScale') }}</span>
                </div>
                <div class="flex items-center gap-1 bg-gray-200/70 dark:bg-gray-900/70 p-0.5 rounded border border-gray-300 dark:border-gray-700">
                  <button
                    class="px-2 py-0.5 text-xs font-semibold rounded transition-colors"
                    :class="settingsStore.boardZoom === 'compact'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
                    data-test="zoom-btn-compact"
                    @click="settingsStore.setBoardZoom('compact')"
                  >
                    {{ t('settings.zoomSmall') }}
                  </button>
                  <button
                    class="px-2 py-0.5 text-xs font-semibold rounded transition-colors"
                    :class="settingsStore.boardZoom === 'normal'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
                    data-test="zoom-btn-normal"
                    @click="settingsStore.setBoardZoom('normal')"
                  >
                    {{ t('settings.zoomNormal') }}
                  </button>
                  <button
                    class="px-2 py-0.5 text-xs font-semibold rounded transition-colors"
                    :class="settingsStore.boardZoom === 'large'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
                    data-test="zoom-btn-large"
                    @click="settingsStore.setBoardZoom('large')"
                  >
                    {{ t('settings.zoomLarge') }}
                  </button>
                  <button
                    class="px-2 py-0.5 text-xs font-semibold rounded transition-colors"
                    :class="settingsStore.boardZoom === 'extra-large'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
                    data-test="zoom-btn-xl"
                    @click="settingsStore.setBoardZoom('extra-large')"
                  >
                    {{ t('settings.zoomExtraLarge') }}
                  </button>
                </div>
              </div>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-tight flex items-center gap-1.5 mt-1">
                <AppIcon name="lightbulb" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                <span>{{ t('settings.zoomTip') }}</span>
              </p>
            </div>

            <!-- Players -->
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-3">{{ t('settings.players') }}</div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-highlight-color-names"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.highlightColorNames') }}</span>
              <Checkbox
                :is-checked="settingsStore.highlightColorNames"
                @changed="settingsStore.setHighlightColorNames"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-show-player-names"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.showPlayerNames') }}</span>
              <div class="flex items-center gap-2">
                <Checkbox
                  :is-checked="settingsStore.showPlayerNames"
                  @changed="settingsStore.setShowPlayerNames"
                />
                <button
                  v-if="settingsStore.showPlayerNames"
                  class="px-2 py-0.5 text-[11px] font-bold rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
                  data-test="edit-player-names-btn"
                  @click="isEditingPlayerNames = true"
                >
                  {{ t('settings.editNames') }}
                </button>
              </div>
            </div>


            <!-- Notes -->
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-3">{{ t('settings.notesSection') }}</div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-notes-highlight-color-names"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.highlightNotesColors') }}</span>
              <Checkbox
                :is-checked="settingsStore.highlightNotesColors"
                @changed="settingsStore.setHighlightNotesColors"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-reset-notes"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.resetNotes') }}</span>
              <Checkbox
                :is-checked="settingsStore.resetNotesOnNewGame"
                @changed="settingsStore.setResetNotesOnNewGame"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-show-round-notes"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.showRoundNotes') }}</span>
              <Checkbox
                :is-checked="settingsStore.showRoundNotes"
                @changed="settingsStore.setShowRoundNotes"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-speech-language"
            >
              <div class="flex flex-col">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.voiceLanguage') }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">
                  {{ settingsStore.speechLanguage === 'auto' ? `Auto: ${detectedLocaleInfo.name}` : getLocaleName(settingsStore.speechLanguage) }}
                </span>
              </div>
              <select
                :value="settingsStore.speechLanguage"
                class="px-2 py-1 text-xs rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
                data-test="select-speech-language"
                @change="(e: Event) => settingsStore.setSpeechLanguage((e.target as HTMLSelectElement).value as any)"
              >
                <option value="auto">
                  🌐 Auto ({{ detectedLocaleInfo.name }})
                </option>
                <option v-for="l in availableLocales" :key="l.code" :value="l.code">
                  {{ l.flag }} {{ l.name }}
                </option>
              </select>
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-mic-permission"
            >
              <div class="flex flex-col">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.micPermission') }}</span>
                <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ t('settings.micSub') }}</span>
              </div>
              <button
                type="button"
                class="px-2.5 py-1 text-xs font-semibold rounded-md border transition-all flex items-center gap-1.5"
                :class="micPermissionState === 'granted'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-sm cursor-pointer'"
                @click="requestMicPermission"
              >
                <AppIcon :name="micPermissionState === 'granted' ? 'check' : 'mic'" class="w-3.5 h-3.5 shrink-0" />
                <span>{{ micPermissionState === 'granted' ? t('settings.micAllowed') : t('settings.micAllow') }}</span>
              </button>
            </div>

            <!-- Map -->
            <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-3">{{ t('settings.mapSection') }}</div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-improve-map-contrast"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.improveContrast') }}</span>
              <Checkbox
                :is-checked="settingsStore.isImproveMapContrastEnabled"
                @changed="settingsStore.setIsImproveMapContrastEnabled"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-show-map-color-names"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.showMapColorNames') }}</span>
              <Checkbox
                :is-checked="settingsStore.showMapColorNames"
                @changed="settingsStore.setShowMapColorNames"
              />
            </div>

            <div
              class="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50"
              data-test="setting-track-own-color"
            >
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('settings.canTrackOwnColor') }}</span>
              <Checkbox
                :is-checked="settingsStore.canTrackOwnColor"
                @changed="settingsStore.setCanTrackOwnColor"
              />
            </div>
          </div>
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
const { t, tColor, locale, setLocale, availableLocales, detectedLocaleInfo } = useI18n();

const isEditingPlayerNames = ref(false);
const { micPermissionState, requestMicrophonePermission } = useMicrophone();

async function requestMicPermission() {
  await requestMicrophonePermission();
}

function getPlayerName(color: string): string {
  return crewStore.crewMembers.find((m) => m.color === color)?.playerName ?? "";
}

function getLocaleName(code: string): string {
  const found = availableLocales.find((l) => l.code === code);
  return found ? `${found.flag} ${found.name}` : code;
}

function handleCloseEvent() {
  if (isEditingPlayerNames.value) {
    isEditingPlayerNames.value = false;
  } else {
    emit("close");
  }
}

function toggleDarkMode() {
  const newValue = !darkModeStore.isDarkMode;
  darkModeStore.setDarkMode(newValue);
  gtag("event", newValue ? "dark_mode_enabled" : "light_mode_enabled", {
    event_category: "global_stats",
  });
}
</script>
