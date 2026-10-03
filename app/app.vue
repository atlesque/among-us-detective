<template>
  <div class="h-auto min-h-full w-full max-w-full overflow-x-hidden">
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
import { checkAndExpireMatchSession, touchMatchActivity } from '~/utils/sessionManager'

const darkModeStore = useDarkModeStore()
const { isDarkMode, hasDarkModeBeenSetBefore } = storeToRefs(darkModeStore)
const settingsStore = useSettingsStore()
const { disableAnimations } = storeToRefs(settingsStore)

const crewStore = useCrewStore()
const roundsStore = useRoundsStore()
const notesStore = useNotesStore()
const tasksStore = useTasksStore()
const impostorStore = useImpostorStore()

const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value || 'en'),
    class: computed(() => [
      isDarkMode.value ? 'dark-mode' : '',
      disableAnimations.value ? 'disable-animations' : ''
    ].filter(Boolean).join(' ')),
  },
})

const isAppInstallationPromptVisible = ref(false)
let pwaInstallEvent: any = null

onMounted(() => {
  if (!hasDarkModeBeenSetBefore.value) {
    darkModeStore.setDarkMode(true)
  }

  // Verify match session expiration (2-hour TTL)
  checkAndExpireMatchSession({
    crewStore,
    roundsStore,
    notesStore,
    tasksStore,
    impostorStore,
    settingsStore,
  })

  // Re-check when returning to the tab after being away
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Shallow watcher for note updates (no recursive object traversal)
  watch(
    () => [notesStore.roundNotes, notesStore.gameNotes],
    () => {
      touchMatchActivity()
    }
  )

  // Board and game state changes (tracks state signatures without expensive deep traversal)
  watch(
    () => [
      crewStore.crewMembers.map((m) => `${m.color}:${m.status}:${m.role}:${m.isDead}:${m.isActive}`).join(','),
      roundsStore.currentRoundNumber,
      roundsStore.roundHistory.length,
      impostorStore.isImpostorModeActive,
      impostorStore.fellowImpostors.join(','),
    ],
    () => {
      touchMatchActivity()
    }
  )

  let hasDismissed = false
  try {
    const stored = localStorage.getItem('appInstallationDismissed')
    hasDismissed = stored ? JSON.parse(stored) === true : false
  } catch {
    hasDismissed = false
  }

  if (!hasDismissed) {
    window.addEventListener('beforeinstallprompt', handleBeforeAppInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('beforeinstallprompt', handleBeforeAppInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    checkAndExpireMatchSession({
      crewStore,
      roundsStore,
      notesStore,
      tasksStore,
      impostorStore,
      settingsStore,
    })
  }
}

function handleAppInstalled() {
  isAppInstallationPromptVisible.value = false
}

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
  try {
    localStorage.setItem('appInstallationDismissed', 'true')
  } catch {}
}
</script>
