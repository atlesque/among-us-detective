export const useDarkModeStore = defineStore(
  "darkMode",
  () => {
    const isDarkMode = ref(false);
    const hasDarkModeBeenSetBefore = ref(false);

    function setDarkMode(value: boolean) {
      isDarkMode.value = value;
      if (!hasDarkModeBeenSetBefore.value) {
        hasDarkModeBeenSetBefore.value = true;
      }
    }

    return {
      isDarkMode,
      hasDarkModeBeenSetBefore,
      setDarkMode,
    };
  },
  { persist: true }
);
