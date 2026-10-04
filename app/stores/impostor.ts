import { defineStore } from 'pinia';
import { ref } from 'vue';

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
        const updatedRoles = { ...fellowImpostorRoles.value };
        delete updatedRoles[color];
        fellowImpostorRoles.value = updatedRoles;
      } else {
        fellowImpostors.value = [...fellowImpostors.value, color];
      }
    }

    function isFellowImpostor(color: string): boolean {
      return isImpostorModeActive.value && fellowImpostors.value.includes(color);
    }

    function setFellowImpostorRole(color: string, role: string | null) {
      const updatedRoles = { ...fellowImpostorRoles.value };
      if (!role) {
        delete updatedRoles[color];
        fellowImpostors.value = fellowImpostors.value.filter((fellowColor) => fellowColor !== color);
      } else {
        updatedRoles[color] = role;
        if (!fellowImpostors.value.includes(color)) {
          fellowImpostors.value = [...fellowImpostors.value, color];
        }
      }
      fellowImpostorRoles.value = updatedRoles;
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
