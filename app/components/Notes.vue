<template>
  <div class="flex flex-col" data-test="notes-container">
    <!-- Round Navigation Timeline inside Notes -->
    <div class="flex items-center justify-between gap-1 overflow-x-auto pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-1 shrink-0">
        <span class="text-[10px] font-bold uppercase text-gray-400 mr-1">{{ t('header.timeline') }}:</span>
        <button
          v-for="snap in roundsStore.roundHistory"
          :key="snap.roundNumber"
          type="button"
          class="px-2 py-0.5 text-[11px] font-bold rounded border transition-all"
          :class="roundsStore.viewingRoundNumber === snap.roundNumber
            ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
          :title="`R${snap.roundNumber}`"
          @click="roundsStore.setViewingRound(snap.roundNumber)"
        >
          R{{ snap.roundNumber }}
        </button>
        <button
          type="button"
          class="px-2 py-0.5 text-[11px] font-bold rounded border transition-all flex items-center gap-1"
          :class="!roundsStore.isViewingHistory
            ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
          :title="t('header.returnToLive')"
          @click="roundsStore.setViewingRound(null)"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>R{{ roundsStore.currentRoundNumber }} ({{ t('header.live') }})</span>
        </button>
      </div>

      <!-- Speech Recognition Controls -->
      <div v-if="isSpeechRecognitionSupported" class="flex items-center gap-1.5 text-[11px] shrink-0">
        <!-- Mic Permission Status / Request Button -->
        <button
          type="button"
          class="px-2 py-0.5 text-[10px] font-bold rounded border transition-all flex items-center gap-1"
          :class="micPermissionState === 'granted'
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 cursor-default'
            : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-sm cursor-pointer'"
          :title="micPermissionState === 'granted' ? t('settings.micAllowed') : t('settings.micAllow')"
          @click="requestMicrophonePermission"
        >
          <AppIcon :name="micPermissionState === 'granted' ? 'check' : 'mic'" class="w-3 h-3 shrink-0" />
          <span>{{ micPermissionState === 'granted' ? t('settings.micAllowed') : t('settings.micAllow') }}</span>
        </button>

        <span class="text-gray-400 text-[10px]">{{ t('notes.languageLabel') }}</span>
        <select
          v-model="selectedSpeechLang"
          class="text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          :title="t('notes.voiceLanguageTitle')"
        >
          <option value="auto">🌐 {{ t('settings.autoLanguage') }}</option>
          <option value="pt-BR">🇧🇷 Português</option>
          <option value="en-US">🇺🇸 English</option>
          <option value="es-ES">🇪🇸 Español</option>
          <option value="ko-KR">🇰🇷 한국어</option>
          <option value="fr-FR">🇫🇷 Français</option>
          <option value="de-DE">🇩🇪 Deutsch</option>
        </select>
        <NuxtLink
          to="/privacy"
          class="text-[10px] text-gray-500 hover:text-gray-300 underline"
          :title="t('notes.micPrivacyNotice')"
        >
          {{ t('cookie.disclaimerLink') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Historical snapshot warning banner -->
    <div
      v-if="roundsStore.isViewingHistory"
      class="p-2 mb-2 bg-amber-500/10 border border-amber-500/30 rounded text-amber-500 text-xs font-semibold flex items-center justify-between"
    >
      <span class="flex items-center gap-1">
        <AppIcon name="clock" class="w-3.5 h-3.5 shrink-0" />
        <span>{{ t('header.historyNotice') }} R{{ roundsStore.viewingRoundNumber }} {{ t('header.historyReadOnly') }}</span>
      </span>
      <button
        class="text-[11px] underline hover:text-amber-400 font-bold"
        @click="roundsStore.setViewingRound(null)"
      >
        {{ t('header.returnToLive') }}
      </button>
    </div>

    <!-- Round Notes Section -->
    <div v-show="showRoundNotes" class="my-1.5 round-notes-wrapper">
      <!-- Dismissible Speech Error Alert with Retry Permission -->
      <div
        v-if="speechError"
        class="mb-2 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs flex items-center justify-between gap-2"
      >
        <div class="flex items-center gap-1.5 min-w-0">
          <AppIcon name="alert" class="w-3.5 h-3.5 shrink-0 text-red-400" />
          <span class="truncate">{{ speechError }}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            class="text-[11px] font-bold underline hover:text-red-300 px-1"
            :title="t('notes.requestMicAgain')"
            @click="requestMicrophonePermission"
          >
            {{ t('notes.allowMic') }}
          </button>
          <button
            type="button"
            class="shrink-0 text-red-400 hover:text-red-300 font-bold text-xs p-0.5"
            :title="t('notes.dismissSpeechError')"
            @click="speechError = ''"
          >
            ✕
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center mb-1">
        <div class="flex items-center gap-2">
          <label
            for="round-notes"
            class="text-xs font-bold text-gray-800 dark:text-gray-200"
          >
            <template v-if="roundsStore.isViewingHistory">
              {{ t('notes.roundNotes', { round: roundsStore.viewingRoundNumber }) }}
            </template>
            <template v-else>
              {{ t('notes.roundNotes', { round: roundsStore.currentRoundNumber }) }}
            </template>
          </label>
          <button
            v-if="isSpeechRecognitionSupported && !roundsStore.isViewingHistory"
            type="button"
            class="px-2 py-0.5 text-xs font-semibold rounded border flex items-center gap-1 transition-all"
            :class="isRecordingRoundNotes
              ? 'bg-red-600 text-white border-red-500 shadow-md animate-pulse'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
            :title="isRecordingRoundNotes ? t('notes.stopVoice') : t('notes.micPrivacyNotice')"
            @click="toggleRecordRoundNotes"
          >
            <span v-if="isRecordingRoundNotes" class="w-2 h-2 rounded-full bg-white animate-ping" />
            <AppIcon name="mic" class="w-3.5 h-3.5 shrink-0" />
            <span class="text-[10px]">{{ isRecordingRoundNotes ? t('notes.listening') : t('notes.startVoice') }}</span>
          </button>
        </div>
        <span class="text-[10px] text-gray-500 dark:text-gray-400">
          <template v-if="roundsStore.isViewingHistory">{{ t('notes.readOnlySnapshot') }}</template>
          <template v-else>{{ t('notes.savedInherited') }}</template>
        </span>
      </div>
      <div class="relative mt-1 rounded-md">
        <textarea
          id="round-notes"
          ref="roundNotesEl"
          v-model="displayRoundNotes"
          :readonly="roundsStore.isViewingHistory"
          :placeholder="t('notes.roundPlaceholder')"
          rows="4"
          class="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          :class="{ 'opacity-80 bg-gray-50 dark:bg-gray-900 cursor-not-allowed': roundsStore.isViewingHistory }"
        />
      </div>
    </div>

    <!-- Match / Game Notes Section -->
    <div class="game-notes-wrapper mt-2.5">
      <div class="flex justify-between items-center mb-1">
        <div class="flex items-center gap-2">
          <label
            for="game-notes"
            class="text-xs font-bold text-gray-800 dark:text-gray-200"
          >
            <span>{{ t('notes.matchNotes') }}</span>
          </label>
          <button
            v-if="isSpeechRecognitionSupported"
            type="button"
            class="px-2 py-0.5 text-xs font-semibold rounded border flex items-center gap-1 transition-all"
            :class="isRecordingGameNotes
              ? 'bg-red-600 text-white border-red-500 shadow-md animate-pulse'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'"
            :title="isRecordingGameNotes ? t('notes.stopVoice') : t('notes.micPrivacyNotice')"
            @click="toggleRecordGameNotes"
          >
            <span v-if="isRecordingGameNotes" class="w-2 h-2 rounded-full bg-white animate-ping" />
            <AppIcon name="mic" class="w-3.5 h-3.5 shrink-0" />
            <span class="text-[10px]">{{ isRecordingGameNotes ? t('notes.listening') : t('notes.startVoice') }}</span>
          </button>
        </div>
        <span class="text-[10px] text-gray-500 dark:text-gray-400">
          {{ t('notes.persistentRounds') }}
        </span>
      </div>
      <div class="relative w-full mt-1">
        <textarea
          id="game-notes"
          ref="gameNotesEl"
          v-model="gameNotes"
          :placeholder="t('notes.matchPlaceholder')"
          rows="4"
          class="w-full p-2 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HighlightWithinTextarea from "~/utils/highlight-within-textarea.js";
import allColors from "~/utils/playerColors.js";

/* global webkitSpeechRecognition, webkitSpeechGrammarList */
declare const webkitSpeechRecognition: any;
declare const webkitSpeechGrammarList: any;

const { t } = useI18n();
const notesStore = useNotesStore();
const roundsStore = useRoundsStore();
const settingsStore = useSettingsStore();
const { resetNotesOnNewGame, showRoundNotes } = storeToRefs(settingsStore);

const roundNotesEl = ref<HTMLTextAreaElement | null>(null);
const gameNotesEl = ref<HTMLTextAreaElement | null>(null);

const isRecordingRoundNotes = ref(false);
const isRecordingGameNotes = ref(false);
const speechError = ref("");
const lastRecordedType = ref("");
let speechRecognition: any = null;
let roundNotesHighlighter: any = null;
let gameNotesHighlighter: any = null;

const isSpeechRecognitionSupported = computed(
  () => typeof webkitSpeechRecognition !== "undefined"
);

const selectedSpeechLang = computed({
  get: () => settingsStore.speechLanguage,
  set: (val: any) => settingsStore.setSpeechLanguage(val),
});

const displayRoundNotes = computed({
  get: () => {
    if (roundsStore.isViewingHistory && roundsStore.activeSnapshot) {
      return roundsStore.activeSnapshot.roundNotes || "";
    }
    return notesStore.roundNotes;
  },
  set: (value: string) => {
    if (roundsStore.isViewingHistory) return;
    notesStore.setRoundNotes(value);
    roundNotesHighlighter?.handleInput();
  },
});

const gameNotes = computed({
  get: () => notesStore.gameNotes,
  set: (value: string) => {
    notesStore.setGameNotes(value);
    gameNotesHighlighter?.handleInput();
  },
});

function getEffectiveSpeechLanguage(): string {
  if (settingsStore.speechLanguage === "auto") {
    return typeof navigator !== "undefined" && navigator.language
      ? navigator.language
      : "en-US";
  }
  return settingsStore.speechLanguage;
}

watch(
  () => settingsStore.speechLanguage,
  () => {
    if (speechRecognition) {
      speechRecognition.lang = getEffectiveSpeechLanguage();
    }
  }
);

watch(
  () => roundsStore.viewingRoundNumber,
  () => {
    speechError.value = "";
    nextTick(() => {
      roundNotesHighlighter?.handleInput();
    });
  }
);

const micPermissionState = ref<'granted' | 'prompt' | 'denied' | 'unknown'>('unknown');

async function updateMicPermissionState() {
  if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
    try {
      const status = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      micPermissionState.value = status.state;
      status.onchange = () => {
        micPermissionState.value = status.state;
      };
    } catch {
      // Permission query for 'microphone' is not supported on some browsers
    }
  }
}

async function requestMicrophonePermission(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return true;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Immediately stop & disable every audio track to ensure the mic hardware is instantly released
    stream.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    micPermissionState.value = 'granted';
    speechError.value = '';
    return true;
  } catch (err: any) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      micPermissionState.value = 'denied';
      speechError.value = t('notes.speechError.notAllowed');
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      speechError.value = t('notes.speechError.deviceNotFound');
    } else {
      speechError.value = t('mic.error.requestFailed');
    }
    return false;
  }
}

let maxRecordingTimeout: any = null;

function clearRecordingTimeout() {
  if (maxRecordingTimeout) {
    clearTimeout(maxRecordingTimeout);
    maxRecordingTimeout = null;
  }
}

function startRecordingTimeout() {
  clearRecordingTimeout();
  // Privacy safety auto-kill: automatically shut down mic after 60 seconds
  maxRecordingTimeout = setTimeout(() => {
    stopAllRecording();
  }, 60000);
}

function stopAllRecording() {
  clearRecordingTimeout();
  isRecordingRoundNotes.value = false;
  isRecordingGameNotes.value = false;
  try {
    speechRecognition?.abort();
    speechRecognition?.stop();
  } catch {}
}

onMounted(() => {
  speechError.value = "";
  const playerHighlightColors = (allColors as string[]).map((color) => ({
    highlight: color,
    className: `bg-player-${color}-light`,
  }));
  if (roundNotesEl.value) {
    roundNotesHighlighter = new HighlightWithinTextarea(roundNotesEl.value, {
      highlight: playerHighlightColors,
    });
  }
  if (gameNotesEl.value) {
    gameNotesHighlighter = new HighlightWithinTextarea(gameNotesEl.value, {
      highlight: playerHighlightColors,
    });
  }
  initSpeechRecording();
  updateMicPermissionState();
  roundNotesEl.value?.focus();
});

onUnmounted(() => {
  stopAllRecording();
  speechError.value = "";
});

function initSpeechRecording() {
  if (!isSpeechRecognitionSupported.value) return;
  speechRecognition = new webkitSpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.lang = getEffectiveSpeechLanguage();

  if (
    typeof webkitSpeechGrammarList !== "undefined" &&
    webkitSpeechGrammarList != null
  ) {
    const grammar =
      "#JSGF V1.0; grammar colors; public <color> = " +
      (allColors as string[]).join(" | ") +
      " ;";
    const speechRecognitionList = new webkitSpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    speechRecognition.grammars = speechRecognitionList;
  }

  speechRecognition.onstart = () => {
    speechError.value = "";
    startRecordingTimeout();
  };

  speechRecognition.onend = () => {
    stopAllRecording();
  };

  speechRecognition.onresult = (event: any) => {
    let finalTranscript = "";
    speechError.value = "";
    if (typeof event.results === "undefined") {
      speechRecognition.onend = null;
      stopAllRecording();
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    const sanitized = finalTranscript.replace(/newline|new line|enter/gi, "\n");
    if (lastRecordedType.value === "roundNotes") {
      notesStore.setRoundNotes(notesStore.roundNotes + sanitized);
      roundNotesHighlighter?.handleInput();
    } else {
      notesStore.setGameNotes(notesStore.gameNotes + sanitized);
      gameNotesHighlighter?.handleInput();
    }
  };

  speechRecognition.onerror = (event: any) => {
    stopAllRecording();
    if (event.error === "no-speech") speechError.value = t('notes.speechError.noSpeech');
    else if (event.error === "audio-capture")
      speechError.value = t('notes.speechError.audioCapture');
    else if (event.error === "not-allowed") {
      micPermissionState.value = "denied";
      speechError.value = t('notes.speechError.notAllowed');
    }
  };
}

async function toggleRecordRoundNotes() {
  if (!isRecordingRoundNotes.value) {
    stopAllRecording();
    speechError.value = "";
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    isRecordingRoundNotes.value = true;
    lastRecordedType.value = "roundNotes";
    try {
      speechRecognition?.start();
    } catch (err: any) {
      stopAllRecording();
      speechError.value = t('notes.speechError.startFailed');
    }
  } else {
    stopAllRecording();
    roundNotesHighlighter?.handleInput();
    setTimeout(() => {
      if (roundNotesEl.value) {
        roundNotesEl.value.scrollTop = roundNotesEl.value.scrollHeight;
      }
    }, 500);
  }
}

async function toggleRecordGameNotes() {
  if (!isRecordingGameNotes.value) {
    stopAllRecording();
    speechError.value = "";
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    isRecordingGameNotes.value = true;
    lastRecordedType.value = "gameNotes";
    try {
      speechRecognition?.start();
    } catch (err: any) {
      stopAllRecording();
      speechError.value = t('notes.speechError.startFailed');
    }
  } else {
    stopAllRecording();
    gameNotesHighlighter?.handleInput();
    setTimeout(() => {
      if (gameNotesEl.value) {
        gameNotesEl.value.scrollTop = gameNotesEl.value.scrollHeight;
      }
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.record-round-button {
  bottom: 5px;
}
</style>
