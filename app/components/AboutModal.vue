<template>
  <div class="flex">
    <Modal max-width="700px" @close="handleCloseEvent">
      <template #title>{{ isFeedbackScreenOpen ? t('about.feedback') : t('about.title') }}</template>
      <template #body>
        <template v-if="isFeedbackScreenOpen">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSda7OlGq68xKkVyx3GsZZntwrGN_CZZJRidgCl5J6R1QIyB2g/viewform?embedded=true"
            class="w-full h-[520px] border-0 rounded-lg"
            title="Feedback Form"
          >Loading…</iframe>
        </template>
        <template v-else>
          <div class="space-y-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
            <p class="flex items-center gap-2">
              <AppIcon name="file" class="w-4 h-4 text-blue-500 shrink-0" />
              <span>{{ t('about.subtitle') }}</span>
            </p>
            <p class="flex items-center gap-2">
              <AppIcon name="shield" class="w-4 h-4 text-emerald-500 shrink-0" />
              <span v-html="t('about.notHack')"></span>
            </p>
            <p class="flex items-center gap-2">
              <AppIcon name="check" class="w-4 h-4 text-emerald-500 stroke-[3] shrink-0" />
              <span>
                {{ t('about.legalSafe') }}
                <NuxtLink to="/disclaimer" class="text-xs text-blue-500 hover:underline ml-1">({{ t('about.readDisclaimer') }})</NuxtLink>
              </span>
            </p>
          </div>

          <!-- Tabs -->
          <div class="flex mt-4 gap-1">
            <button
              class="px-3 py-1.5 text-xs font-bold rounded-t border border-b-0 transition-colors cursor-pointer"
              :class="activeTab === 'changelog'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
              @click="activeTab = 'changelog'"
            >
              {{ t('about.changelog') }}
            </button>
            <button
              class="px-3 py-1.5 text-xs font-bold rounded-t border border-b-0 transition-colors cursor-pointer"
              :class="activeTab === 'upcomingChanges'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
              @click="activeTab = 'upcomingChanges'"
            >
              {{ t('about.roadmapBacklog') }}
            </button>
          </div>
          <div class="mb-3 border border-gray-300 dark:border-gray-700 rounded-b rounded-tr">
            <Changelog v-show="activeTab === 'changelog'" />
            <UpcomingChangesList v-show="activeTab === 'upcomingChanges'" />
          </div>

          <!-- Credits Footer -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <div class="space-y-1">
              <span class="block">
                {{ t('about.originalBy') }}
                <a href="https://github.com/atlesque/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline font-medium">Alexandre Atlesque</a>
              </span>
              <span class="block">
                {{ t('about.modernizedBy') }}
                <a href="mailto:mrbbinder@gmail.com" class="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Marcos Binder</a>
                <a href="https://github.com/marcosbinder/among-us-detective" target="_blank" rel="noopener noreferrer" class="text-[11px] text-gray-400 dark:text-gray-500 hover:text-emerald-500 underline ml-1" :title="t('about.viewGithubFork')">(fork v2.0)</a>
              </span>
            </div>
            <div class="flex flex-col items-start sm:items-end gap-1">
              <div class="flex items-center gap-3">
                <button
                  class="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                  @click="isFeedbackScreenOpen = true"
                >
                  {{ t('about.giveFeedback') }}
                </button>
                <DonationButton show-link />
              </div>
              <span class="text-[10px] text-gray-400 dark:text-gray-500 italic text-left sm:text-right max-w-xs leading-tight">
                {{ t('about.donateNotice') }}
              </span>
            </div>
          </div>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()

const isFeedbackScreenOpen = ref(false)
const activeTab = ref('changelog')

function handleCloseEvent() {
  if (isFeedbackScreenOpen.value) {
    isFeedbackScreenOpen.value = false
  } else {
    emit('close')
  }
}
</script>
