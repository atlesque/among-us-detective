<template>
  <section
    id="detective-notepad"
    data-test="notes-container"
    class="w-full rounded-xl border transition-all duration-300 shadow-md backdrop-blur-sm"
    :class="impostorStore.isImpostorModeActive
      ? 'bg-rose-50/60 dark:bg-rose-950/40 dark:bg-rose-950/50 border-rose-300/60 dark:border-rose-800/60 dark:border-rose-700/60 shadow-rose-200/40 dark:shadow-rose-950/40 ring-1 ring-rose-300/40 dark:ring-rose-900/40'
      : 'bg-white/80 dark:bg-gray-900/75 dark:bg-gray-950/80 border-gray-200 dark:border-gray-700/60 dark:border-gray-800/80'"
  >
    <!-- Notepad Header Bar (Clean, Compact & Perfectly Aligned) -->
    <header
      class="relative z-20 flex flex-wrap sm:flex-nowrap items-center justify-between px-2.5 py-1.5 sm:px-3 sm:py-1.5 gap-2 border-b transition-colors w-full max-w-full"
      :class="impostorStore.isImpostorModeActive
        ? 'border-rose-300/40 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/40'
        : 'border-gray-200 dark:border-gray-800/80 bg-gray-50/80 dark:bg-gray-900/60'"
    >
      <!-- Left: Minimize Toggle, Mode Icon, Title, Badge & Subtitle -->
      <div class="flex items-center gap-2 min-w-0">
        <!-- Minimize / Expand Toggle Button -->
        <button
          type="button"
          class="w-6 h-6 rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          :class="impostorStore.isImpostorModeActive
            ? 'bg-rose-100 dark:bg-rose-900/40 hover:bg-rose-200 dark:hover:bg-rose-900/70 text-rose-600 dark:text-rose-300 border border-rose-300/50 dark:border-rose-700/50'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700/60'"
          :title="isMinimized ? t('notepad.expand') : t('notepad.minimize')"
          :aria-label="isMinimized ? t('notepad.expand') : t('notepad.minimize')"
          data-test="notes-minimize-btn"
          @click="isMinimized = !isMinimized"
        >
          <AppIcon
            :name="isMinimized ? 'chevron-down' : 'chevron-up'"
            class="w-3.5 h-3.5 shrink-0"
          />
        </button>

        <!-- Mode Icon Badge -->
        <div
          class="w-6 h-6 rounded-md shrink-0 flex items-center justify-center border"
          :class="impostorStore.isImpostorModeActive
            ? 'bg-rose-600/20 text-rose-400 border-rose-500/30'
            : 'bg-blue-500/15 text-blue-400 border-blue-500/30'"
        >
          <AppIcon
            :name="impostorStore.isImpostorModeActive ? 'skull' : 'notes'"
            class="w-3.5 h-3.5 shrink-0"
          />
        </div>

        <!-- Title, Badge & Subtitle Block -->
        <div class="min-w-0 flex flex-col justify-center">
          <div class="flex items-center gap-1.5 sm:gap-2">
            <h2 class="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap !m-0 !p-0 leading-none">
              {{ impostorStore.isImpostorModeActive ? t('notepad.impostorTitle') : t('notepad.title') }}
            </h2>
            <span
              class="inline-flex items-center justify-center text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 leading-none !m-0"
              :class="impostorStore.isImpostorModeActive
                ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700/60'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700/50'"
            >
              {{ impostorStore.isImpostorModeActive ? t('notepad.impostorBadge') : t('notepad.badge') }}
            </span>
          </div>
          <p
            v-if="!isMinimized"
            class="text-[10px] sm:text-[11px] hidden md:block !mt-1 !mb-0 leading-none"
            :class="impostorStore.isImpostorModeActive ? 'text-rose-300/80' : 'text-gray-400'"
          >
            {{ impostorStore.isImpostorModeActive ? t('notepad.impostorSubtitle') : t('notepad.subtitle') }}
          </p>
        </div>
      </div>

      <!-- Right: Permissions, Color Highlighting Toggle & Shortcut -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Mic Missing Permission Warning Banner -->
        <div
          v-if="micPermissionState !== 'granted'"
          class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-[10px] text-amber-800 dark:text-amber-300"
          data-test="mic-permission-banner"
        >
          <AppIcon name="mic" class="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
          <button
            type="button"
            class="underline font-bold hover:text-amber-900 dark:hover:text-amber-200 cursor-pointer"
            data-test="mic-allow-btn"
            :title="t('notes.micPrivacyNotice')"
            @click="requestMicrophonePermission"
          >
            {{ t('notes.allowMic') }}
          </button>
        </div>

        <!-- Color Highlighting Toggle (Desktop only; configured in Settings on mobile) -->
        <button
          type="button"
          data-test="toggle-notepad-highlight"
          class="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer shadow-sm select-none"
          :class="settingsStore.highlightNotesColors
            ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-600 dark:text-indigo-300 border-indigo-500/40'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700/50'"
          :title="settingsStore.highlightNotesColors ? t('notepad.disableHighlight') : t('notepad.enableHighlight')"
          @click="toggleHighlight"
        >
          <span
            class="w-2 h-2 rounded-full transition-all shrink-0"
            :class="settingsStore.highlightNotesColors ? 'bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]' : 'bg-gray-400 dark:bg-gray-500'"
          />
          <span class="hidden xs:inline sm:inline">{{ t('notepad.highlightToggle') }}:</span>
          <span :class="settingsStore.highlightNotesColors ? 'text-indigo-700 dark:text-indigo-200 font-bold' : 'text-gray-600 dark:text-gray-400'">
            {{ settingsStore.highlightNotesColors ? t('notepad.on') : t('notepad.off') }}
          </span>
        </button>

        <!-- Voice Language Selector Dropdown -->
        <div class="relative">
          <button
            type="button"
            data-test="notepad-voice-language-btn"
            class="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer shadow-sm select-none bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700/50"
            :title="`Reconhecimento de Voz: ${effectiveLanguageLabel}`"
            aria-label="Idioma do reconhecimento de voz"
            @click="isVoiceLangMenuOpen = !isVoiceLangMenuOpen"
          >
            <AppIcon name="mic" class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
            <span>{{ speechLanguageButtonLabel }}</span>
            <AppIcon
              name="chevron-down"
              class="w-3 h-3 text-gray-500 dark:text-gray-400 transition-transform duration-150"
              :class="isVoiceLangMenuOpen ? 'rotate-180 text-blue-500 dark:text-blue-400' : ''"
            />
          </button>

          <!-- Backdrop to close on click outside -->
          <div
            v-if="isVoiceLangMenuOpen"
            class="fixed inset-0 z-40"
            @click="isVoiceLangMenuOpen = false"
          />

          <!-- Dropdown Options Menu -->
          <div
            v-if="isVoiceLangMenuOpen"
            class="absolute right-0 top-full mt-1.5 z-50 min-w-[140px] py-1 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl backdrop-blur-md"
          >
            <button
              v-for="opt in voiceLanguageOptions"
              :key="opt.value"
              type="button"
              class="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-medium text-left transition-colors cursor-pointer"
              :class="settingsStore.speechLanguage === opt.value
                ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 font-bold border-l-2 border-blue-500'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
              @click="selectSpeechLanguage(opt.value)"
            >
              <span class="flex items-center gap-2">
                <span>{{ opt.flag }}</span>
                <span>{{ opt.label }}</span>
              </span>
              <AppIcon
                v-if="settingsStore.speechLanguage === opt.value"
                name="check"
                class="w-3 h-3 text-blue-500 dark:text-blue-400"
              />
            </button>
          </div>
        </div>

        <span
          class="hidden sm:inline-flex text-[9px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-black/40 text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700/40 font-mono"
        >
          N
        </span>
      </div>
    </header>

    <!-- Speech Error Notice -->
    <div
      v-if="speechError && !isMinimized"
      class="px-3 py-1 bg-red-50 dark:bg-red-900/40 border-b border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-200 text-[11px] flex items-center justify-between gap-2"
    >
      <div class="flex items-center gap-1.5 min-w-0 truncate">
        <AppIcon name="close" class="w-3.5 h-3.5 shrink-0 text-red-500 dark:text-red-400" />
        <span class="truncate">{{ speechError }}</span>
      </div>
      <button
        type="button"
        class="text-[10px] text-red-600 dark:text-red-300 hover:text-red-800 dark:hover:text-white underline shrink-0 font-bold cursor-pointer"
        @click="speechError = ''"
      >
        Dismiss
      </button>
    </div>

    <!-- Notepad Body (Collapsible & Compact) -->
    <div v-show="!isMinimized" class="p-2.5 sm:p-3.5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5">
        <!-- Round Notes Column -->
        <div v-if="settingsStore.showRoundNotes" class="flex flex-col">
          <div class="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 min-h-[26px]">
            <div class="flex items-center gap-2">
              <span
                v-if="roundsStore.isViewingHistory"
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              >
                <AppIcon name="clock" class="w-3 h-3 shrink-0" />
                {{ t('notes.roundNotes', { round: roundsStore.viewingRoundNumber }) }} ({{ t('notepad.roundArchived') }})
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border"
                :class="impostorStore.isImpostorModeActive
                  ? 'bg-rose-100 dark:bg-rose-600/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/30'
                  : 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :class="isRecording && recordingTarget === 'round' ? 'bg-red-500 animate-ping' : (impostorStore.isImpostorModeActive ? 'bg-rose-500' : 'bg-emerald-500')"
                />
                {{ t('notes.roundNotes', { round: roundsStore.currentRoundNumber }) }}
              </span>

              <!-- Direct Microphone Button for Round Notes -->
              <button
                v-if="isSpeechRecognitionSupported && !roundsStore.isViewingHistory"
                type="button"
                class="px-2 py-0.5 text-[11px] font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer border shadow-sm"
                :class="isRecording && recordingTarget === 'round'
                  ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse border-red-400 shadow-red-900/40'
                  : impostorStore.isImpostorModeActive
                    ? 'bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700/50'
                    : 'bg-emerald-50 dark:bg-emerald-600/15 hover:bg-emerald-100 dark:hover:bg-emerald-600/25 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'"
                :title="isRecording && recordingTarget === 'round' ? t('notes.stopVoice') : t('notes.startVoice')"
                data-test="notes-voice-btn"
                @click="toggleVoiceRecordingFor('round')"
              >
                <span
                  v-if="isRecording && recordingTarget === 'round'"
                  class="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"
                />
                <AppIcon v-else name="mic" class="w-3 h-3 shrink-0" />
                <span>{{ isRecording && recordingTarget === 'round' ? t('notes.listening') : t('notes.startVoice') }}</span>
              </button>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span v-if="roundsStore.isViewingHistory" class="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                {{ t('notes.readOnlySnapshot') }}
              </span>
              <span v-else class="text-[10px] text-gray-500 dark:text-gray-400 font-normal hidden sm:inline">
                {{ t('notes.savedInherited') }}
              </span>
              <button
                v-if="roundsStore.isViewingHistory"
                type="button"
                class="text-[10px] text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline font-bold cursor-pointer"
                @click="roundsStore.setViewingRound(null)"
              >
                {{ t('header.returnToLive') }}
              </button>
            </div>
          </div>

          <textarea
            id="round-notes"
            ref="roundNotesEl"
            v-model="quickRoundNotes"
            :readonly="roundsStore.isViewingHistory"
            rows="2"
            data-test="round-notes"
            :placeholder="roundsStore.isViewingHistory
              ? t('notes.readOnlySnapshot')
              : (impostorStore.isImpostorModeActive ? t('notepad.roundImpostorPlaceholder') : t('notes.roundPlaceholder'))"
            class="w-full p-2 text-xs sm:text-sm rounded-lg border text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all resize-y min-h-[64px] bg-white/70 dark:bg-transparent"
            :class="roundsStore.isViewingHistory
              ? 'border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-200/90 cursor-not-allowed'
              : impostorStore.isImpostorModeActive
                ? 'border-rose-300 dark:border-rose-800/70 focus:ring-1 focus:ring-rose-500 focus:border-rose-500'
                : 'border-gray-300 dark:border-gray-700/70 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'"
            @focus="recordingTarget = 'round'"
            @input="roundNotesHighlighter?.handleInput()"
          />
        </div>

        <!-- Full Match Notes Column -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 min-h-[26px]">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border"
                :class="impostorStore.isImpostorModeActive
                  ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-200 border-rose-300 dark:border-rose-700/50'
                  : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :class="isRecording && recordingTarget === 'match' ? 'bg-red-500 animate-ping' : (impostorStore.isImpostorModeActive ? 'bg-rose-500' : 'bg-indigo-500')"
                />
                {{ t('notes.matchNotes') }}
              </span>

              <!-- Direct Microphone Button for Match Notes -->
              <button
                v-if="isSpeechRecognitionSupported"
                type="button"
                class="px-2 py-0.5 text-[11px] font-semibold rounded-md flex items-center gap-1 transition-all cursor-pointer border shadow-sm"
                :class="isRecording && recordingTarget === 'match'
                  ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse border-red-400 shadow-red-900/40'
                  : impostorStore.isImpostorModeActive
                    ? 'bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700/50'
                    : 'bg-indigo-50 dark:bg-indigo-600/15 hover:bg-indigo-100 dark:hover:bg-indigo-600/25 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/30'"
                :title="isRecording && recordingTarget === 'match' ? t('notes.stopVoice') : t('notes.startVoice')"
                data-test="match-notes-voice-btn"
                @click="toggleVoiceRecordingFor('match')"
              >
                <span
                  v-if="isRecording && recordingTarget === 'match'"
                  class="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"
                />
                <AppIcon v-else name="mic" class="w-3 h-3 shrink-0" />
                <span>{{ isRecording && recordingTarget === 'match' ? t('notes.listening') : t('notes.startVoice') }}</span>
              </button>
            </div>

            <span class="text-[10px] text-gray-500 dark:text-gray-400 font-normal hidden sm:inline">
              {{ t('notes.persistentRounds') }}
            </span>
          </div>

          <textarea
            id="game-notes"
            ref="gameNotesEl"
            v-model="gameNotes"
            rows="2"
            data-test="game-notes"
            :placeholder="impostorStore.isImpostorModeActive
              ? t('notepad.matchImpostorPlaceholder')
              : t('notes.matchPlaceholder')"
            class="w-full p-2 text-xs sm:text-sm rounded-lg border text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all resize-y min-h-[64px] bg-white/70 dark:bg-transparent"
            :class="impostorStore.isImpostorModeActive
              ? 'border-rose-300 dark:border-rose-800/70 focus:ring-1 focus:ring-rose-500 focus:border-rose-500'
              : 'border-gray-300 dark:border-gray-700/70 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'"
            @focus="recordingTarget = 'match'"
            @input="gameNotesHighlighter?.handleInput()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HighlightWithinTextarea from '~/utils/highlight-within-textarea.js'
import { buildTextHighlighterRules } from '~/utils/textHighlighter'
import { useImpostorStore } from '~/stores/impostor'

/* global SpeechRecognition, webkitSpeechRecognition, webkitSpeechGrammarList */
declare const SpeechRecognition: any
declare const webkitSpeechRecognition: any
declare const webkitSpeechGrammarList: any

const { t, locale } = useI18n()
const notesStore = useNotesStore()
const roundsStore = useRoundsStore()
const settingsStore = useSettingsStore()
const crewStore = useCrewStore()
const impostorStore = useImpostorStore()

const isMinimized = ref(false)
const recordingTarget = ref<'round' | 'match'>('round')

const roundNotesEl = ref<HTMLTextAreaElement | null>(null)
const gameNotesEl = ref<HTMLTextAreaElement | null>(null)

let roundNotesHighlighter: any = null
let gameNotesHighlighter: any = null

const isRecording = ref(false)
const speechError = ref('')
let speechRecognition: any = null
let maxRecordingTimeout: any = null

const SpeechRecognitionClass = computed(() => {
  if (typeof window === 'undefined') return null
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null
})

const isSpeechRecognitionSupported = computed(
  () => !!SpeechRecognitionClass.value
)

const {
  micPermissionState,
  micErrorMessage,
  requestMicrophonePermission,
} = useMicrophone()

const quickRoundNotes = computed({
  get: () => {
    if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
      return roundsStore.activeSnapshot.roundNotes || ''
    }
    return notesStore.roundNotes
  },
  set: (value: string) => {
    if (roundsStore.isViewingHistory) return
    notesStore.setRoundNotes(value)
    roundNotesHighlighter?.handleInput()
  },
})

const gameNotes = computed({
  get: () => notesStore.gameNotes,
  set: (value: string) => {
    notesStore.setGameNotes(value)
    gameNotesHighlighter?.handleInput()
  },
})

function detectBrowserSpeechLanguage(): 'pt-BR' | 'en-US' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE' {
  if (typeof navigator === 'undefined') return 'en-US'
  const navLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase()
  if (navLang.startsWith('pt')) return 'pt-BR'
  if (navLang.startsWith('es')) return 'es-ES'
  if (navLang.startsWith('fr')) return 'fr-FR'
  if (navLang.startsWith('de')) return 'de-DE'
  if (navLang.startsWith('ko')) return 'ko-KR'
  return 'en-US'
}

const browserLanguageCode = computed(() => detectBrowserSpeechLanguage())

const autoLanguageShort = computed(() => {
  const browserCode = browserLanguageCode.value
  return browserCode.substring(0, 2).toUpperCase()
})

const isVoiceLangMenuOpen = ref(false)

const voiceLanguageOptions = computed(() => [
  { value: 'auto' as const, flag: '🌐', label: `Auto (${autoLanguageShort.value})` },
  { value: 'pt-BR' as const, flag: '🇧🇷', label: 'Português' },
  { value: 'en-US' as const, flag: '🇺🇸', label: 'English' },
  { value: 'es-ES' as const, flag: '🇪🇸', label: 'Español' },
  { value: 'fr-FR' as const, flag: '🇫🇷', label: 'Français' },
  { value: 'de-DE' as const, flag: '🇩🇪', label: 'Deutsch' },
  { value: 'ko-KR' as const, flag: '🇰🇷', label: '한국어' },
])

const speechLanguageButtonLabel = computed(() => {
  if (settingsStore.speechLanguage === 'auto') {
    return `Auto (${autoLanguageShort.value})`
  }
  return settingsStore.speechLanguage.substring(0, 2).toUpperCase()
})

function selectSpeechLanguage(val: any) {
  settingsStore.setSpeechLanguage(val)
  isVoiceLangMenuOpen.value = false
}

const effectiveSpeechLanguage = computed<'pt-BR' | 'en-US' | 'es-ES' | 'ko-KR' | 'fr-FR' | 'de-DE'>(() => {
  if (settingsStore.speechLanguage && settingsStore.speechLanguage !== 'auto') {
    return settingsStore.speechLanguage
  }
  return browserLanguageCode.value
})

const effectiveLanguageLabel = computed(() => {
  const lang = effectiveSpeechLanguage.value
  if (lang.startsWith('pt')) return 'Português (Brasil)'
  if (lang.startsWith('en')) return 'English (US)'
  if (lang.startsWith('es')) return 'Español'
  if (lang.startsWith('fr')) return 'Français'
  if (lang.startsWith('de')) return 'Deutsch'
  if (lang.startsWith('ko')) return '한국어'
  return lang
})

function getEffectiveSpeechLanguage(): string {
  return effectiveSpeechLanguage.value
}

function clearRecordingTimeout() {
  if (maxRecordingTimeout) {
    clearTimeout(maxRecordingTimeout)
    maxRecordingTimeout = null
  }
}

function startRecordingTimeout() {
  clearRecordingTimeout()
  // Privacy safety auto-kill: automatically shut down mic after 60 seconds
  maxRecordingTimeout = setTimeout(() => {
    stopRecording()
  }, 60000)
}

function stopRecording() {
  clearRecordingTimeout()
  isRecording.value = false
  try {
    speechRecognition?.abort()
    speechRecognition?.stop()
  } catch {}
}

function initSpeechRecording() {
  if (!isSpeechRecognitionSupported.value || !SpeechRecognitionClass.value) return
  try {
    const Recognition = SpeechRecognitionClass.value
    speechRecognition = new Recognition()
    speechRecognition.continuous = true
    speechRecognition.interimResults = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.lang = getEffectiveSpeechLanguage()

    speechRecognition.onstart = () => {
      speechError.value = ''
      startRecordingTimeout()
    }

    speechRecognition.onend = () => {
      stopRecording()
    }

    speechRecognition.onresult = (event: any) => {
      let finalTranscript = ''
      speechError.value = ''
      if (typeof event.results === 'undefined') {
        speechRecognition.onend = null
        stopRecording()
        return
      }
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }
      const sanitized = finalTranscript.replace(/newline|new line|enter/gi, '\n')
      if (sanitized) {
        if (recordingTarget.value === 'match') {
          const cur = notesStore.gameNotes
          notesStore.setGameNotes(cur ? cur + ' ' + sanitized : sanitized)
          gameNotesHighlighter?.handleInput()
        } else {
          const cur = notesStore.roundNotes
          notesStore.setRoundNotes(cur ? cur + ' ' + sanitized : sanitized)
          roundNotesHighlighter?.handleInput()
        }
      }
    }

    speechRecognition.onerror = (event: any) => {
      stopRecording()
      if (event.error === 'no-speech') speechError.value = 'No speech detected'
      else if (event.error === 'audio-capture') speechError.value = 'Check your recording device'
      else if (event.error === 'not-allowed') {
        micPermissionState.value = 'denied'
        speechError.value = 'Microphone access blocked. Click "Allow Mic" or enable permissions in browser URL bar.'
      }
    }
  } catch {
    // Web Speech Recognition init failed
  }
}

async function toggleVoiceRecordingFor(target: 'round' | 'match') {
  if (isRecording.value) {
    if (recordingTarget.value === target) {
      stopRecording()
      roundNotesHighlighter?.handleInput()
      gameNotesHighlighter?.handleInput()
    } else {
      recordingTarget.value = target
    }
    return
  }

  recordingTarget.value = target
  stopRecording()
  speechError.value = ''
  const hasPermission = await requestMicrophonePermission()
  if (!hasPermission) return

  if (!speechRecognition) {
    initSpeechRecording()
  }
  if (speechRecognition) {
    speechRecognition.lang = getEffectiveSpeechLanguage()
    isRecording.value = true
    try {
      speechRecognition.start()
    } catch {
      stopRecording()
    }
  }
}

function toggleVoiceRecording() {
  toggleVoiceRecordingFor(recordingTarget.value)
}

function updateHighlighters() {
  const customPlayers = crewStore.crewMembers
    .filter((m) => m.playerName && m.playerName.trim().length > 0)
    .map((m) => ({ name: m.playerName!, color: m.color }))

  const rules = buildTextHighlighterRules(
    locale.value,
    customPlayers,
    settingsStore.highlightNotesColors
  )

  if (roundNotesEl.value) {
    if (roundNotesHighlighter) {
      roundNotesHighlighter.highlight = { highlight: rules }
      roundNotesHighlighter.handleInput()
    } else {
      roundNotesHighlighter = new HighlightWithinTextarea(roundNotesEl.value, {
        highlight: rules,
      })
    }
  }
  if (gameNotesEl.value) {
    if (gameNotesHighlighter) {
      gameNotesHighlighter.highlight = { highlight: rules }
      gameNotesHighlighter.handleInput()
    } else {
      gameNotesHighlighter = new HighlightWithinTextarea(gameNotesEl.value, {
        highlight: rules,
      })
    }
  }
}

watch(
  () => [settingsStore.highlightNotesColors, locale.value, crewStore.crewMembers.map((m) => m.playerName).join(',')],
  () => {
    nextTick(() => {
      updateHighlighters()
    })
  }
)

watch(
  () => roundsStore.viewingRoundNumber,
  () => {
    nextTick(() => {
      roundNotesHighlighter?.handleInput()
    })
  }
)

onMounted(() => {
  initSpeechRecording()
  nextTick(() => {
    updateHighlighters()
  })
})

onUnmounted(() => {
  stopRecording()
})

function expandAndFocus() {
  isMinimized.value = false
  nextTick(() => {
    document.getElementById('detective-notepad')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    roundNotesEl.value?.focus()
  })
}

function expand() {
  isMinimized.value = false
}

function toggleMinimize() {
  isMinimized.value = !isMinimized.value
}

function minimize() {
  isMinimized.value = true
}

function toggleHighlight() {
  settingsStore.setHighlightNotesColors(!settingsStore.highlightNotesColors)
  nextTick(() => {
    updateHighlighters()
  })
}

defineExpose({
  isMinimized,
  expand,
  expandAndFocus,
  minimize,
  toggleMinimize,
  toggleVoiceRecording,
  toggleVoiceRecordingFor,
  toggleHighlight,
})
</script>
