<template>
  <section class="upcoming-changes" data-test="upcoming-changes-list">
    <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 text-gray-800 dark:text-gray-200 space-y-3">
      <!-- Community Feedback Phase Banner (v2.0) -->
      <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs space-y-2 shadow-xs">
        <div class="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2 text-sm">
          <AppIcon name="help" class="w-4 h-4 text-blue-500 shrink-0" />
          <span>{{ t('roadmap.phaseTitle') }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
          {{ t('roadmap.phaseDesc') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
</script>
