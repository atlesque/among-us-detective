<template>
  <div class="flex w-32 h-12">
    <button
      v-if="isPlayerPickerOpen === false"
      class="flex items-center justify-center w-full h-full rounded button"
      :class="`bg-player-${currentColor}`"
      @click="isPlayerPickerOpen = true"
    >
      <span class="px-1 text-black">Player</span>
    </button>
    <div
      v-else
      class="grid flex-1 grid-cols-6 grid-rows-2 gap-1 grid-auto-flow"
    >
      <button
        v-for="color in playerColors"
        :key="color"
        :class="`bg-player-${color}`"
        @click="selectPlayerColor(color)"
      ></button>
    </div>
  </div>
</template>

<script>
import availableColors from "@/config/playerColors.js";

export default {
  name: "PlayerSelector",
  props: {
    currentColor: {
      type: String,
      default: "yellow",
    },
  },
  data() {
    return {
      isPlayerPickerOpen: false,
      playerColors: availableColors,
    };
  },
  methods: {
    selectPlayerColor(selectedColor) {
      this.$emit("change", selectedColor);
      this.isPlayerPickerOpen = false;
    },
  },
};
</script>
