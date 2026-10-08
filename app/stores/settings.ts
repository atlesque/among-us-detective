export const useSettingsStore = defineStore(
  "settings",
  () => {
    const highlightColorNames = ref(false);
    const highlightNotesColors = ref(true);
    const showPlayerNames = ref(false);
    const showColorNames = ref(true);
    const settingsModalOpenState = ref(false);
    const resetNotesOnNewGame = ref(true);
    const showRoundNotes = ref(true);
    // Shows or hides the player's own pin on the movement map.
    // Kept strictly to the map (on the deduction board, your player card is always shown).
    const canTrackOwnColor = ref(true);
    const isImproveMapContrastEnabled = ref(true);
    const boardZoom = ref<'compact' | 'normal' | 'large' | 'extra-large'>('normal');
    const disableAnimations = ref(false);
    const speechLanguage = ref<'auto' | 'pt-BR' | 'en-US' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE'>('auto');
    const uiLanguage = ref<'auto' | 'en-US' | 'pt-BR' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE'>('auto');
    const hasAutoDetectedLanguage = ref(false);
    const matchImpostorsCount = ref<1 | 2 | 3>(2);
    const showQuorumAlert = ref(true);

    function setMatchImpostorsCount(count: 1 | 2 | 3) {
      matchImpostorsCount.value = count;
    }

    function setShowQuorumAlert(value: boolean) {
      showQuorumAlert.value = value;
    }

    function setDisableAnimations(value: boolean) {
      disableAnimations.value = value;
    }

    function setBoardZoom(value: 'compact' | 'normal' | 'large' | 'extra-large') {
      boardZoom.value = value;
    }

    function setSpeechLanguage(value: 'auto' | 'pt-BR' | 'en-US' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE') {
      speechLanguage.value = value;
    }

    function setUiLanguage(value: 'auto' | 'en-US' | 'pt-BR' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE') {
      uiLanguage.value = value;
    }

    function setHasAutoDetectedLanguage(value: boolean) {
      hasAutoDetectedLanguage.value = value;
    }

    function setHighlightColorNames(value: boolean) {
      highlightColorNames.value = value;
    }
    function setHighlightNotesColors(value: boolean) {
      highlightNotesColors.value = value;
    }
    function setShowPlayerNames(value: boolean) {
      showPlayerNames.value = value;
    }
    function setShowColorNames(value: boolean) {
      showColorNames.value = value;
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
      highlightColorNames,
      highlightNotesColors,
      showPlayerNames,
      showColorNames,
      settingsModalOpenState,
      resetNotesOnNewGame,
      showRoundNotes,
      canTrackOwnColor,
      isImproveMapContrastEnabled,
      boardZoom,
      disableAnimations,
      speechLanguage,
      uiLanguage,
      hasAutoDetectedLanguage,
      setHighlightColorNames,
      setHighlightNotesColors,
      setShowPlayerNames,
      setShowColorNames,
      setSettingsModalOpenState,
      setResetNotesOnNewGame,
      setShowRoundNotes,
      setCanTrackOwnColor,
      setIsImproveMapContrastEnabled,
      setBoardZoom,
      setDisableAnimations,
      setSpeechLanguage,
      setUiLanguage,
      setHasAutoDetectedLanguage,
      matchImpostorsCount,
      showQuorumAlert,
      setMatchImpostorsCount,
      setShowQuorumAlert,
    };
  },
  { persist: true }
);
