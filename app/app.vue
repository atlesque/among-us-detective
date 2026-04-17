<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="h-auto min-h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Transition name="fade">
      <AppInstallationPrompt
        v-if="isAppInstallationPromptVisible"
        @confirm="handleAppInstallationConfirmed"
        @cancel="handleAppInstallationDismissed"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const darkModeStore = useDarkModeStore()
const { isDarkMode, hasDarkModeBeenSetBefore } = storeToRefs(darkModeStore)

const isAppInstallationPromptVisible = ref(false)
let pwaInstallEvent: any = null

onMounted(() => {
  if (
    !hasDarkModeBeenSetBefore.value &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
  ) {
    darkModeStore.setDarkMode(true)
  }

  const hasDismissed = JSON.parse(localStorage.getItem('appInstallationDismissed') ?? 'false')
  if (!hasDismissed) {
    window.addEventListener('beforeinstallprompt', handleBeforeAppInstallPrompt)
    window.addEventListener('appinstalled', () => {
      isAppInstallationPromptVisible.value = false
    })
  }
})

function handleBeforeAppInstallPrompt(event: Event) {
  pwaInstallEvent = event as any
  pwaInstallEvent.userChoice.then(() => {
    isAppInstallationPromptVisible.value = false
    window.removeEventListener('beforeinstallprompt', handleBeforeAppInstallPrompt)
  })
  isAppInstallationPromptVisible.value = true
}

function handleAppInstallationConfirmed() {
  if (pwaInstallEvent != null) {
    pwaInstallEvent.prompt()
  } else {
    isAppInstallationPromptVisible.value = false
  }
}

function handleAppInstallationDismissed() {
  isAppInstallationPromptVisible.value = false
  localStorage.setItem('appInstallationDismissed', 'true')
}
</script>
