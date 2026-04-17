<template>
  <div class="flex justify-between">
    <div class="flex items-center justify-center flex-1">
      <span class="p-1 text-2xl" :class="numberClass" @dblclick="resetCount">{{
        currentCount
      }}</span>
    </div>
    <div v-show="!isDisabled" class="flex flex-col">
      <button
        class="flex items-center justify-center mb-1 shadow button-sm button-success"
        @click="increaseCount"
      >
        <span>+</span>
      </button>
      <button
        class="flex items-center justify-center shadow button-sm button-danger"
        @click="decreaseCount"
      >
        <span>-</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  count?: number;
  isDisabled?: boolean;
}>();

const emit = defineEmits<{ changed: [value: number] }>();

const currentCount = computed({
  get: () => props.count ?? 0,
  set: (value: number) => emit("changed", value),
});

const numberClass = computed(() => {
  if (currentCount.value >= 2) return "text-player-red font-bold";
  if (currentCount.value > 0) return "text-theme-black";
  return "text-theme-gray-light";
});

function increaseCount() {
  currentCount.value = currentCount.value + 1;
}

function decreaseCount() {
  if (currentCount.value > 0) {
    currentCount.value = currentCount.value - 1;
  }
}

function resetCount() {
  currentCount.value = 0;
}
</script>
