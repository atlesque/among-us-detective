export const useSettingsStore = defineStore(
  "settings",
  () => {
    const showColorNames = ref(false);
    const showImposterCheckbox = ref(true);
    const showTasksCheckbox = ref(true);
    const showMeetingsCount = ref(true);
    const showPlayerNames = ref(false);
    const settingsModalOpenState = ref(false);
    const resetNotesOnNewGame = ref(true);
    const showRoundNotes = ref(true);
    const canTrackOwnColor = ref(true);
    const isImproveMapContrastEnabled = ref(true);

    function setShowColorNames(value: boolean) {
      showColorNames.value = value;
    }
    function setShowImposterCheckbox(value: boolean) {
      showImposterCheckbox.value = value;
    }
    function setShowTasksCheckbox(value: boolean) {
      showTasksCheckbox.value = value;
    }
    function setShowMeetingsCount(value: boolean) {
      showMeetingsCount.value = value;
    }
    function setShowPlayerNames(value: boolean) {
      showPlayerNames.value = value;
    }
    function setSettingsModalOpenState(value: boolean) {
      settingsModalOpenState.value = value;
    }
    function setResetNotesOnNewGame(value: boolean) {
      resetNotesOnNewGame.value = value;
    }
    function setShowRoundNotes(value: boolean) {
      showRoundNotes.value = value;
    }
    function setCanTrackOwnColor(value: boolean) {
      canTrackOwnColor.value = value;
    }
    function setIsImproveMapContrastEnabled(value: boolean) {
      isImproveMapContrastEnabled.value = value;
    }

    return {
      showColorNames,
      showImposterCheckbox,
      showTasksCheckbox,
      showMeetingsCount,
      showPlayerNames,
      settingsModalOpenState,
      resetNotesOnNewGame,
      showRoundNotes,
      canTrackOwnColor,
      isImproveMapContrastEnabled,
      setShowColorNames,
      setShowImposterCheckbox,
      setShowTasksCheckbox,
      setShowMeetingsCount,
      setShowPlayerNames,
      setSettingsModalOpenState,
      setResetNotesOnNewGame,
      setShowRoundNotes,
      setCanTrackOwnColor,
      setIsImproveMapContrastEnabled,
    };
  },
  { persist: true }
);
