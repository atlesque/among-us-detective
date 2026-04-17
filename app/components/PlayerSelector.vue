<template>
  <div class="flex" data-test="player-selector">
    <button
      class="flex items-center justify-center w-full h-full rounded button"
      :class="`bg-player-${currentColor}`"
      data-test="player-selector-btn"
      @click="isPlayerPickerOpen = true"
    >
      <span class="px-1 text-black bg-white rounded">My player</span>
    </button>
    <Modal v-if="isPlayerPickerOpen" @close="isPlayerPickerOpen = false">
      <template #title>Choose your color</template>
      <template #body>
        <div class="grid w-full grid-cols-4 gap-1 my-4 grid-auto-flow">
          <button
            v-for="color in playerColors"
            :key="color"
            class="flex items-center justify-center p-4 rounded color-icon"
            :class="[
              `bg-player-${color}`,
              { 'color-icon--selected': color === selectedColor },
            ]"
            :data-test="`player-color-${color}`"
            @click="selectPlayerColor(color)"
          >
            <span class="px-1 text-black bg-white rounded color-name">{{
              color
            }}</span>
          </button>
        </div>
        <div class="flex items-center" data-test="imposter-mode-row">
          <label class="mb-0 mr-2">Imposter mode:</label>
          <Checkbox
            :is-checked="isImposter"
            data-test="imposter-mode-checkbox"
            @changed="(value) => (isImposter = value)"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import availableColors from "~/utils/playerColors.js";

const props = defineProps<{
  currentColor?: string;
  isPickerOpen?: boolean;
}>();

const emit = defineEmits<{
  pickerToggle: [value: boolean];
  colorChanged: [color: string];
}>();

const crewStore = useCrewStore();
const { isPlayerImposter, playerCrewMember } = storeToRefs(crewStore);

const playerColors = availableColors as string[];
const selectedColor = ref(props.currentColor ?? "yellow");

const isPlayerPickerOpen = computed({
  get: () => props.isPickerOpen ?? false,
  set: (value: boolean) => emit("pickerToggle", value),
});

const isImposter = computed({
  get: () => isPlayerImposter.value,
  set: (value: boolean) => {
    if (playerCrewMember.value) {
      crewStore.setMemberIsImposter({
        member: playerCrewMember.value,
        isImposter: value,
      });
    }
  },
});

function selectPlayerColor(color: string) {
  selectedColor.value = color;
  emit("colorChanged", color);
}

watch(
  () => props.currentColor,
  (newColor) => {
    if (newColor) selectedColor.value = newColor;
  }
);
</script>

<style lang="scss" scoped>
.color-icon {
  &--selected {
    box-shadow: 0 0 0 3px black;

    .color-name {
      @apply bg-black text-white;
      box-shadow: 0 0 0 3px black;
    }
  }
}
</style>
