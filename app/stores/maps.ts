import allMaps from "~/utils/maps.js";

export const useMapsStore = defineStore("maps", () => {
  const maps = ref<string[]>([...(allMaps as string[])]);
  const selectedMap = ref<string>((allMaps as string[])[0]);
  const isMapVisible = ref(false);

  // Historical map selection is derived by the map view from its snapshot.
  // Keep this value as the user's live selection so returning to live restores it.

  function setSelectedMap(value: string) {
    selectedMap.value = value;
  }

  function toggleMap(force?: boolean) {
    isMapVisible.value = force !== undefined ? force : !isMapVisible.value;
  }

  function setMaps(value: string[]) {
    maps.value = value;
  }

  function resetAllMaps() {
    maps.value = [...(allMaps as string[])];
  }

  function isKnownMap(mapId: string | undefined): mapId is string {
    return Boolean(mapId && maps.value.includes(mapId));
  }

  return {
    maps,
    selectedMap,
    isMapVisible,
    setSelectedMap,
    toggleMap,
    setMaps,
    resetAllMaps,
    isKnownMap,
  };
}, {
  // Only the live map choice is saved. Pin positions are saved per map in the
  // rounds store, so losing the choice on reload hid them and let Next Round
  // archive the wrong map.
  persist: {
    pick: ["selectedMap"],
    afterHydrate: ({ store }) => {
      const hydratedStore = store as typeof store & {
        selectedMap: string;
        isKnownMap: (mapId: string | undefined) => boolean;
      };
      if (!hydratedStore.isKnownMap(hydratedStore.selectedMap)) {
        hydratedStore.selectedMap = (allMaps as string[])[0];
      }
    },
  },
});
