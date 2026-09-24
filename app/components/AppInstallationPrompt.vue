<template>
  <section
    class="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl md:px-4"
  >
    <div class="flex flex-wrap items-center justify-around w-full max-w-2xl">
      <span class="mb-4 text-center font-regular text-gray-800 dark:text-gray-200">
        Would you like to install Among Us Detective as an app for easy access?
      </span>
      <div class="flex justify-around w-full max-w-lg">
        <button class="font-bold text-theme-green btn" @click="emit('confirm')">Yes please</button>
        <button class="font-bold text-theme-red btn" @click="emit('cancel')">No thanks</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>
