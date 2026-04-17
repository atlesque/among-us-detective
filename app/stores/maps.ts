import allMaps from "~/utils/maps.js";

export const useMapsStore = defineStore("maps", () => {
  const maps = ref<string[]>([...(allMaps as string[])]);
  const selectedMap = ref<string>((allMaps as string[])[0]);

  function setSelectedMap(value: string) {
    selectedMap.value = value;
  }

  function setMaps(value: string[]) {
    maps.value = value;
  }

  function resetAllMaps() {
    maps.value = [...(allMaps as string[])];
  }

  return {
    maps,
    selectedMap,
    setSelectedMap,
    setMaps,
    resetAllMaps,
  };
});
