<template>
  <section
    class="fixed bottom-14 left-2 right-2 sm:left-auto sm:right-4 z-40 flex items-center justify-center p-3.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 shadow-2xl max-w-lg"
  >
    <div class="flex flex-col items-center justify-center w-full">
      <span class="mb-3 text-center text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
        {{ t('pwa.installPrompt') }}
      </span>
      <div class="flex justify-around w-full gap-2">
        <button type="button" class="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer" @click="emit('confirm')">
          {{ t('pwa.yesPlease') }}
        </button>
        <button type="button" class="px-4 py-1.5 text-xs font-bold rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer" @click="emit('cancel')">
          {{ t('pwa.noThanks') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>
