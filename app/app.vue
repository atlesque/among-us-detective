<template>
  <div class="h-auto min-h-full w-full max-w-full overflow-x-hidden">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Transition name="fade">
      <AppInstallationPrompt
        v-if="isInstallPromptVisible"
        @confirm="promptInstall"
        @cancel="dismissPrompt"
      />
    </Transition>
    <Transition name="fade">
      <AppUpdatePrompt
        v-if="isUpdatePromptVisible && !isInstallPromptVisible"
        @update="applyUpdate"
        @later="postponeUpdate"
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
const impostorStore = useImpostorStore()
const { resetMatchState } = useNewMatch()

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

import { usePwaInstall } from '~/composables/usePwaInstall'

const { isInstallPromptVisible, promptInstall, dismissPrompt } = usePwaInstall()

// A new deploy waits in the background instead of reloading the page on its own,
// so a running timer or dictation is never cut off mid-match. The player applies it
// from this prompt; if they postpone, it activates the next time the app is opened.
// Right after V2 replaces V1, the page is already V2 but V1's worker still controls
// it, so V2's worker waits and would ask to "update" to what is already showing.
// Skip that prompt; V2's worker takes over once the app is closed.
const { $pwa, $servedByV1Worker } = useNuxtApp()
const isUpdatePromptVisible = computed(() => !!$pwa?.needRefresh && !$servedByV1Worker)

function applyUpdate() {
  // vite-pwa only reloads by itself when the page already had a controlling service
  // worker at load time, so reload here once the new worker takes over (or shortly after).
  let reloaded = false
  const reload = () => {
    if (reloaded) return
    reloaded = true
    window.location.reload()
  }
  navigator.serviceWorker?.addEventListener('controllerchange', reload, { once: true })
  setTimeout(reload, 3000)
  $pwa?.updateServiceWorker()
}

function postponeUpdate() {
  $pwa?.cancelPrompt()
}

onMounted(() => {
  if (!hasDarkModeBeenSetBefore.value) {
    darkModeStore.setDarkMode(true)
  }

  // Verify match session expiration (2-hour TTL)
  checkAndExpireMatchSession(resetMatchState)

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
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

function handleVisibilityChange() {
  if (document.visibilityState === 'visible') {
    checkAndExpireMatchSession(resetMatchState)
  }
}
</script>
