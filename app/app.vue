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
  })

  // Re-check when returning to the tab after being away
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkAndExpireMatchSession({
        crewStore,
        roundsStore,
        notesStore,
        tasksStore,
        impostorStore,
      })
    }
  })

  // Shallow watcher for note updates (no recursive object traversal)
  watch(
    () => [notesStore.roundNotes, notesStore.gameNotes],
    () => {
      touchMatchActivity()
    }
  )

  // Board and game state changes
  watch(
    () => [
      crewStore.crewMembers,
      roundsStore.currentRoundNumber,
      roundsStore.roundHistory.length,
      impostorStore.isImpostorModeActive,
      impostorStore.fellowImpostors,
    ],
    () => {
      touchMatchActivity()
    },
    { deep: true }
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
