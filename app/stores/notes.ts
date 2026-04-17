export const useNotesStore = defineStore("notes", () => {
  const areNotesOpen = ref(false);

  function setNotesOpenState(value: boolean) {
    areNotesOpen.value = value;
  }

  return {
    areNotesOpen,
    setNotesOpenState,
  };
});
