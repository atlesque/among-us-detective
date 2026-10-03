export const useImpostorStore = defineStore(
  'impostor',
  () => {
    const isImpostorModeActive = ref(false);
    const fellowImpostors = ref<string[]>([]);
    const fellowImpostorRoles = ref<Record<string, string>>({});

    function toggleImpostorMode() {
      isImpostorModeActive.value = !isImpostorModeActive.value;
      if (!isImpostorModeActive.value) {
        clearFellowImpostors();
      }
    }

    function setImpostorMode(active: boolean) {
      isImpostorModeActive.value = active;
      if (!active) {
        clearFellowImpostors();
      }
    }

    function toggleFellowImpostor(color: string) {
      if (fellowImpostors.value.includes(color)) {
        fellowImpostors.value = fellowImpostors.value.filter((fellowColor) => fellowColor !== color);
        delete fellowImpostorRoles.value[color];
      } else {
        fellowImpostors.value.push(color);
      }
    }

    function isFellowImpostor(color: string): boolean {
      return isImpostorModeActive.value && fellowImpostors.value.includes(color);
    }

    function setFellowImpostorRole(color: string, role: string | null) {
      if (!role) {
        delete fellowImpostorRoles.value[color];
        fellowImpostors.value = fellowImpostors.value.filter((fellowColor) => fellowColor !== color);
        return;
      }
      fellowImpostors.value = [...new Set(fellowImpostors.value)];
      if (!fellowImpostors.value.includes(color)) {
        fellowImpostors.value.push(color);
      }
      fellowImpostorRoles.value[color] = role;
    }

    function clearFellowImpostors() {
      fellowImpostors.value = [];
      fellowImpostorRoles.value = {};
    }

    return {
      isImpostorModeActive,
      fellowImpostors,
      fellowImpostorRoles,
      toggleImpostorMode,
      setImpostorMode,
      toggleFellowImpostor,
      isFellowImpostor,
      setFellowImpostorRole,
      clearFellowImpostors,
    };
  },
  {
    persist: true,
  }
);
