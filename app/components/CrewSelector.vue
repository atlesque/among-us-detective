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

<script setup lang="ts">
import allColors from "~/utils/playerColors.js";

const props = defineProps<{ ownColor: string }>();

const availableColors = computed(() =>
  (allColors as string[]).filter((color) => color !== props.ownColor)
);
</script>
