<template>
  <div
    class="flex items-center checkbox"
  >
    <input
      :id="id"
      v-model="isChecked"
      type="checkbox"
      class="w-full h-full mb-0 transition duration-150 ease-in-out border-2 form-checkbox"
      :class="[`text-player-${color}`, `border-player-${color}`]"
    />
    <label :for="id" class="block mb-0 ml-2 select-none">
      <slot />
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  color: string
}>()

const isChecked = ref(false)
</script>
