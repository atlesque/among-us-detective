<template>
  <aside
    class="fixed bottom-20 right-3 sm:bottom-20 sm:right-6 z-50 p-3.5 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 shadow-2xl max-w-[calc(100vw-24px)] sm:max-w-sm transition-all"
    data-test="pwa-update-prompt"
    role="dialog"
    aria-labelledby="pwa-update-title"
  >
    <!-- Header with Icon, Title, and Close Button -->
    <div class="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <AppIcon name="refresh" class="w-3.5 h-3.5" />
        </div>
        <span id="pwa-update-title" class="text-xs font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Among Us Detective
        </span>
      </div>

      <button
        type="button"
        class="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        :title="t('pwa.close')"
        :aria-label="t('pwa.close')"
        @click="emit('later')"
      >
        <AppIcon name="close" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Message -->
    <p class="text-xs font-medium leading-relaxed text-gray-700 dark:text-gray-300 mb-3.5">
      {{ t('pwa.updateReady') }}
    </p>

    <!-- Buttons -->
    <div class="flex items-center justify-end gap-2">
      <button
        type="button"
        data-test="pwa-update-later"
        class="px-3 py-1.5 text-xs font-semibold rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        @click="emit('later')"
      >
        {{ t('pwa.updateLater') }}
      </button>
      <button
        type="button"
        data-test="pwa-update-now"
        class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
        @click="emit('update')"
      >
        <AppIcon name="refresh" class="w-3 h-3 stroke-[3]" />
        <span>{{ t('pwa.updateNow') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { t } = useI18n()
const emit = defineEmits<{ update: []; later: [] }>()
</script>
