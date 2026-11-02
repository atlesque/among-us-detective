export const useNotesStore = defineStore(
  "notes",
  () => {
    const areNotesOpen = ref(false);
    const roundNotes = ref("");
    const gameNotes = ref("");

    function setNotesOpenState(value: boolean) {
      areNotesOpen.value = value;
    }

    function setRoundNotes(value: string) {
      roundNotes.value = value;
    }

    function setGameNotes(value: string) {
      gameNotes.value = value;
    }

    function clearRoundNotes() {
      roundNotes.value = "";
    }

    function clearGameNotes() {
      gameNotes.value = "";
    }

    return {
      areNotesOpen,
      roundNotes,
      gameNotes,
      setNotesOpenState,
      setRoundNotes,
      setGameNotes,
      clearRoundNotes,
      clearGameNotes,
    };
  },
  { persist: true }
);
