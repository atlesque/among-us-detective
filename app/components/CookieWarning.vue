<template>
  <Transition name="fade">
    <aside
      v-if="isVisible"
      role="region"
      aria-label="Cookie and privacy consent banner"
      aria-live="polite"
      class="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-800 shadow-2xl transition-all duration-300"
      data-test="cookie-warning"
    >
      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs">
        <!-- Message & Privacy Link -->
        <div class="flex items-start sm:items-center gap-2.5 text-gray-700 dark:text-gray-300 leading-relaxed text-center sm:text-left">
          <div class="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0 hidden xs:flex">
            <AppIcon name="shield" class="w-4 h-4" />
          </div>
          <p>
            {{ t('cookie.message') }}{{ ' ' }}
            <NuxtLink
              to="/disclaimer"
              class="underline font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-block transition-colors"
              data-test="cookie-disclaimer-link"
            >
              {{ t('cookie.disclaimerLink') }} →
            </NuxtLink>
          </p>
        </div>

        <!-- Action Button -->
        <div class="flex items-center shrink-0 w-full sm:w-auto justify-center sm:justify-end">
          <button
            type="button"
            class="w-full sm:w-auto px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-sm transition-all cursor-pointer"
            data-test="cookie-dismiss-btn"
            @click="acceptCookies"
          >
            {{ t('cookie.dismiss') || t('cookie.accept') }}
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
const isVisible = ref(false)

onMounted(() => {
  try {
    const choice = localStorage.getItem('acceptedCookies')
    if (!choice) {
      isVisible.value = true
    }
  } catch {
    isVisible.value = false
  }
})

function acceptCookies() {
  try {
    localStorage.setItem('acceptedCookies', 'true')
  } catch {}
  isVisible.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
