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
});
