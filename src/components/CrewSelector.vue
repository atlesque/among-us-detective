<template>
  <div>
    <div class="grid flex-1 grid-cols-6 grid-rows-2 gap-1 grid-auto-flow">
      <CrewCheckbox
        v-for="color in availableColors"
        :key="color"
        :color="color"
        class="w-8 h-8"
      />
    </div>
  </div>
</template>
<script>
import allColors from "@/config/playerColors.js";

const CrewCheckbox = () => import("@/components/CrewCheckbox.vue");

export default {
  name: "CrewSelector",
  components: {
    CrewCheckbox,
  },
  props: {
    ownColor: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      allColors,
      selectedColors: [],
      isCrewPickerOpen: false,
    };
  },
  computed: {
    availableColors() {
      return this.allColors.filter(color => color !== this.ownColor);
    },
  },
  methods: {
    selectColor(color) {
      this.selectedColors.push(color);
      this.isCrewPickerOpen = false;
    },
    removeColor(colorToRemove) {
      this.selectedColors = this.selectedColors.filter(
        color => color !== colorToRemove
      );
    },
    toggleColor(color) {
      if (this.selectedColors.includes(color) === true) {
        this.removeColor(color);
      } else {
        this.selectColor(color);
      }
    },
    isColorActive(color) {
      return this.selectedColors.includes(color) === true;
    },
  },
};
</script>
<style lang="scss" scoped>
.disabled {
  @apply opacity-25;
}
</style>
