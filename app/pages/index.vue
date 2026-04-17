<template>
  <div class="flex flex-col p-2 lg:p-8" :class="{ 'dark-mode': isDarkMode }">
    <div class="flex flex-col-reverse justify-between mb-2 lg:flex-row">
      <div class="justify-between hidden lg:flex lg:flex-col">
        <PlayerSelector
          :current-color="crewStore.playerColor"
          :is-picker-open="isPlayerPickerOpen"
          class="h-12 mb-2"
          @color-changed="handleChangePlayerColor"
          @picker-toggle="handleTogglePlayerPicker"
        />
        <button
          class="flex items-center justify-center w-full h-12 button"
          data-test="tasks-btn"
          @click="isTasksModalOpen = true"
        >
          Tasks
        </button>
      </div>
      <div class="flex justify-center flex-1">
        <button
          class="py-1 rounded-r-none button-sm lg:ml-2"
          data-test="notes-btn"
          @click="toggleNotesModal"
        >
          Notes
        </button>
        <div class="flex flex-row flex-1 max-w-xl min-h-12">
          <CrewPool
            :crew-members="crewStore.inactiveCrewMembers"
            :show-color-names="settingsStore.showColorNames"
            :show-player-names="settingsStore.showPlayerNames"
            class="flex-1 border lg:mb-0 pool--inactive"
            @changed="value => handleCrewChanged({ type: 'inactive', value })"
            @removed="member => handleMemberRemoved({ list: 'inactive', member })"
          />
          <button
            :disabled="crewStore.inactiveCrewMembers.length <= 0"
            class="rounded-l-none lg:mr-2 button-sm"
            data-test="activate-all-btn"
            @click="crewStore.setAllMembersAsUnknown()"
          >
            <span class="icon-arrow-down2" />
          </button>
        </div>
      </div>
      <div class="flex justify-between mb-2 lg:mb-0 lg:flex-col">
        <button
          class="h-12 mr-2 lg:w-full button button-success"
          :disabled="crewStore.activeCrewMembers.length <= 0"
          data-test="new-round-btn"
          @click="initNewRound"
        >
          New round
        </button>
        <div class="flex lg:hidden">
          <PlayerSelector
            class="mr-2"
            :current-color="crewStore.playerColor"
            :is-picker-open="isPlayerPickerOpen"
            @color-changed="handleChangePlayerColor"
            @picker-toggle="handleTogglePlayerPicker"
          />
          <button
            class="py-1 mr-2 button-sm"
            data-test="tasks-btn-mobile"
            @click="isTasksModalOpen = true"
          >
            Tasks
          </button>
        </div>
        <button
          class="h-12 lg:w-full button button-warning"
          :disabled="crewStore.activeCrewMembers.length <= 0"
          data-test="new-game-btn"
          @click="initNewGame"
        >
          New game
        </button>
      </div>
    </div>
    <CrewTracker
      :player-color="crewStore.playerColor"
      :innocent="crewStore.crewMembersProtectedByPlayer"
      :unknown="crewStore.unknownCrewMembersForPlayer"
      :suspect="crewStore.crewMembersSuspectedByPlayer"
      :dead="crewStore.deadCrewMembers"
      :show-color-names="settingsStore.showColorNames"
      :show-player-names="settingsStore.showPlayerNames"
      class="mb-2 lg:mb-4"
      @changed="handleCrewChanged"
      @removed="handleMemberRemoved"
    />
    <CrewStats
      v-show="crewStore.activeCrewMembers.length > 0"
      :crew-members="crewStore.activeCrewMembers"
      :show-color-names="settingsStore.showColorNames"
      :show-player-names="settingsStore.showPlayerNames"
      class="mb-2"
    />
    <div class="fixed bottom-0 left-0 right-0 z-20 flex justify-end px-2 py-1">
      <button class="mr-2 button-sm" data-test="settings-btn" @click="toggleSettingsModal">
        Settings
      </button>
      <button class="mr-2 button-sm" data-test="help-btn" @click="toggleHelpModal">
        Help
      </button>
      <button class="button-sm" data-test="about-btn" @click="toggleAboutModal">About</button>
    </div>
    <div class="relative">
      <Maps />
    </div>
    <NotesModal
      v-if="isNotesModalOpen"
      :round="roundNotes"
      :game="gameNotes"
      @round-notes-changed="value => (roundNotes = value)"
      @game-notes-changed="value => (gameNotes = value)"
      @close="toggleNotesModal"
    />
    <HelpModal v-if="isHelpModalOpen" @close="toggleHelpModal" />
    <AboutModal v-if="isAboutModalOpen" @close="toggleAboutModal" />
    <SettingsModal v-if="isSettingsModalOpen" @close="toggleSettingsModal" />
    <TasksModal v-if="isTasksModalOpen" @close="toggleTasksModal" />
    <CookieWarning />
  </div>
</template>

<script setup lang="ts">
import type { CrewMember } from '~/app/stores/crew'

const crewStore = useCrewStore()
const settingsStore = useSettingsStore()
const notesStore = useNotesStore()
const tasksStore = useTasksStore()
const { gtag } = useGtag()

const { isDarkMode } = storeToRefs(useDarkModeStore())

const isPlayerPickerOpen = ref(false)
const isHelpModalOpen = ref(false)
const isAboutModalOpen = ref(false)
const isTasksModalOpen = ref(false)
const roundNotes = ref('')
const gameNotes = ref('')

const isNotesModalOpen = computed({
  get: () => notesStore.areNotesOpen,
  set: (value: boolean) => notesStore.setNotesOpenState(value),
})

const isSettingsModalOpen = computed({
  get: () => settingsStore.settingsModalOpenState,
  set: (value: boolean) => settingsStore.setSettingsModalOpenState(value),
})

onMounted(() => {
  initNewGame()
  if (JSON.parse(localStorage.getItem('returningPlayer') ?? 'false') !== true) {
    isHelpModalOpen.value = true
    localStorage.setItem('returningPlayer', JSON.stringify(true))
  }
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.code === 'KeyN' && !isNotesModalOpen.value && !isSettingsModalOpen.value) {
      isNotesModalOpen.value = true
    } else if (e.code === 'Escape' && isNotesModalOpen.value) {
      isNotesModalOpen.value = false
    }
  })
})

function initNewGame() {
  crewStore.resetAllCrew()
  tasksStore.resetAllTasks()
  if (settingsStore.resetNotesOnNewGame) gameNotes.value = ''
  roundNotes.value = ''
  gtag('event', 'init_new_game', { event_category: 'global_stats' })
}

function initNewRound() {
  crewStore.resetActiveCrew()
  tasksStore.resetAllTasks()
  roundNotes.value = ''
  gtag('event', 'init_new_round', { event_category: 'global_stats' })
}

function handleChangePlayerColor(selectedColor: string) {
  crewStore.setPlayerColor(selectedColor)
  initNewGame()
  gtag('event', `change_player_color_${selectedColor}`, { event_category: 'player_stats' })
}

function handleCrewChanged({ type, value }: { type: string; value: CrewMember[] }) {
  if (type === 'inactive') {
    crewStore.setInactiveCrewMembers(value)
  } else if (type === 'innocent') {
    const newMember = value.find(
      m => !crewStore.crewMembersProtectedByPlayer.some(p => p.color === m.color),
    )
    if (newMember) {
      gtag('event', `marked_as_innocent_${newMember.color}`, { event_category: 'player_stats' })
    }
    crewStore.setProtectedCrewMembers(value)
  } else if (type === 'unknown') {
    crewStore.setUnknownCrewMembers(value)
  } else if (type === 'suspect') {
    const newMember = value.find(
      m => !crewStore.crewMembersSuspectedByPlayer.some(s => s.color === m.color),
    )
    if (newMember) {
      gtag('event', `marked_as_suspect_${newMember.color}`, { event_category: 'player_stats' })
    }
    crewStore.setSuspectedCrewMembers(value)
  } else if (type === 'dead') {
    const newMember = value.find(
      m => !crewStore.deadCrewMembers.some(d => d.color === m.color),
    )
    if (newMember) {
      gtag('event', `marked_as_dead_${newMember.color}`, { event_category: 'global_stats' })
    }
    crewStore.setDeadCrewMembers(value)
  }
}

function handleMemberRemoved({ list, member }: { list: string; member: CrewMember }) {
  if (list === 'inactive') {
    crewStore.setMemberAsUnknown(member)
  } else if (list === 'innocent') {
    crewStore.setMemberAsUnknown(member)
  } else if (list === 'unknown') {
    crewStore.setMemberAsInactive(member)
  } else if (list === 'suspect') {
    crewStore.setMemberAsUnknown(member)
  } else if (list === 'dead') {
    crewStore.setMemberAsUnknown(member)
  }
}

function handleTogglePlayerPicker(isOpen: boolean) {
  isPlayerPickerOpen.value = isOpen
}

function toggleHelpModal() {
  const newValue = !isHelpModalOpen.value
  isHelpModalOpen.value = newValue
  if (newValue) gtag('event', 'open_help', { event_category: 'global_stats' })
}

function toggleAboutModal() {
  const newValue = !isAboutModalOpen.value
  isAboutModalOpen.value = newValue
  if (newValue) gtag('event', 'open_changelog', { event_category: 'global_stats' })
}

function toggleSettingsModal() {
  const newValue = !isSettingsModalOpen.value
  isSettingsModalOpen.value = newValue
  if (newValue) gtag('event', 'open_settings', { event_category: 'global_stats' })
}

function toggleNotesModal() {
  const newValue = !isNotesModalOpen.value
  isNotesModalOpen.value = newValue
  if (newValue) gtag('event', 'open_notes', { event_category: 'global_stats' })
}

function toggleTasksModal() {
  const newValue = !isTasksModalOpen.value
  isTasksModalOpen.value = newValue
  if (newValue) gtag('event', 'open_fake_tasks', { event_category: 'global_stats' })
}
</script>
