export const useSettingsStore = defineStore(
  "settings",
  () => {
    const highlightColorNames = ref(false);
    const highlightNotesColors = ref(true);
    const showPlayerNames = ref(false);
    const showMapColorNames = ref(false);
    const settingsModalOpenState = ref(false);
    const resetNotesOnNewGame = ref(true);
    const showRoundNotes = ref(true);
    const canTrackOwnColor = ref(true);
    const isImproveMapContrastEnabled = ref(true);
    const boardZoom = ref<'compact' | 'normal' | 'large' | 'extra-large'>('normal');
    const disableAnimations = ref(false);
    const speechLanguage = ref<'auto' | 'pt-BR' | 'en-US' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE'>('auto');
    const uiLanguage = ref<'auto' | 'en-US' | 'pt-BR' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE'>('auto');
    const hasAutoDetectedLanguage = ref(false);

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
    function setShowMapColorNames(value: boolean) {
      showMapColorNames.value = value;
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
      showMapColorNames,
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
      setShowMapColorNames,
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
    };
  },
  { persist: true }
);
