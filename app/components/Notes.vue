<template>
  <div class="flex flex-col" data-test="notes-container">
    <div v-show="showRoundNotes" class="my-2 round-notes-wrapper">
      <span class="text-sm text-theme-red">{{ speechError }}</span>
      <div class="flex justify-between">
        <div class="flex items-center justify-center">
          <label
            for="round-notes"
            class="block mr-1 text-sm font-medium leading-5 text-gray-700"
          >
            This round
          </label>
          <button
            v-if="isSpeechRecognitionSupported"
            class="relative flex items-center justify-center w-8 h-8 record-round-button"
            :class="{
              'text-player-green': isRecordingRoundNotes,
              'text-player-red':
                lastRecordedType === 'roundNotes' && speechError.length > 0,
            }"
            @click="toggleRecordRoundNotes"
          >
            <span class="icon-mic" />
          </button>
        </div>
        <span class="text-xs leading-5 text-gray-500">Cleared each round</span>
      </div>
      <div class="relative mt-1 rounded-md">
        <textarea
          id="round-notes"
          ref="roundNotesEl"
          v-model="roundNotes"
          placeholder="e.g. Red saw me do medbay"
          rows="5"
        />
      </div>
    </div>
    <div class="game-notes-wrapper">
      <div class="flex justify-between">
        <div class="flex items-center justify-center">
          <label
            for="game-notes"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            <template v-if="resetNotesOnNewGame">This game</template>
            <template v-else>General</template>
          </label>
          <button
            v-if="isSpeechRecognitionSupported"
            class="relative flex items-center justify-center w-8 h-8 record-round-button"
            :class="{
              'text-player-green': isRecordingGameNotes,
              'text-player-red':
                lastRecordedType === 'gameNotes' && speechError.length > 0,
            }"
            @click="toggleRecordGameNotes"
          >
            <span class="icon-mic" />
          </button>
        </div>
        <span class="text-xs leading-5 text-gray-500">
          <template v-if="resetNotesOnNewGame">Cleared each game</template>
          <template v-else>Never cleared</template>
        </span>
      </div>
      <div class="relative w-full mt-1">
        <textarea
          id="game-notes"
          ref="gameNotesEl"
          v-model="gameNotes"
          placeholder="e.g. Orange and cyan are a group"
          rows="5"
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

const props = defineProps<{ round?: string; game?: string }>();
const emit = defineEmits<{
  roundNotesChanged: [value: string];
  gameNotesChanged: [value: string];
}>();

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

const roundNotes = computed({
  get: () => props.round ?? "",
  set: (value: string) => {
    emit("roundNotesChanged", value);
    roundNotesHighlighter?.handleInput();
  },
});

const gameNotes = computed({
  get: () => props.game ?? "",
  set: (value: string) => {
    emit("gameNotesChanged", value);
    gameNotesHighlighter?.handleInput();
  },
});

onMounted(() => {
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
  roundNotesEl.value?.focus();
});

function initSpeechRecording() {
  if (!isSpeechRecognitionSupported.value) return;
  speechRecognition = new webkitSpeechRecognition();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.maxAlternatives = 1;
  speechRecognition.lang = "en-US";

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
  };

  speechRecognition.onresult = (event: any) => {
    let finalTranscript = "";
    speechError.value = "";
    if (typeof event.results === "undefined") {
      speechRecognition.onend = null;
      speechRecognition.stop();
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    const sanitized = finalTranscript.replace(/newline|new line|enter/gi, "\n");
    if (lastRecordedType.value === "roundNotes") {
      emit("roundNotesChanged", (props.round ?? "") + sanitized);
      roundNotesHighlighter?.handleInput();
    } else {
      emit("gameNotesChanged", (props.game ?? "") + sanitized);
      gameNotesHighlighter?.handleInput();
    }
  };

  speechRecognition.onerror = (event: any) => {
    if (event.error === "no-speech") speechError.value = "No speech detected";
    if (event.error === "audio-capture")
      speechError.value = "Check your recording device";
    if (event.error === "not-allowed")
      speechError.value = "Check recording permissions in your browser";
    isRecordingRoundNotes.value = false;
    isRecordingGameNotes.value = false;
  };
}

function toggleRecordRoundNotes() {
  if (!isRecordingRoundNotes.value) {
    isRecordingRoundNotes.value = true;
    lastRecordedType.value = "roundNotes";
    speechRecognition?.start();
  } else {
    isRecordingRoundNotes.value = false;
    speechRecognition?.stop();
    roundNotesHighlighter?.handleInput();
    setTimeout(() => {
      if (roundNotesEl.value) {
        roundNotesEl.value.scrollTop = roundNotesEl.value.scrollHeight;
      }
    }, 500);
  }
}

function toggleRecordGameNotes() {
  if (!isRecordingGameNotes.value) {
    isRecordingGameNotes.value = true;
    lastRecordedType.value = "gameNotes";
    speechRecognition?.start();
  } else {
    isRecordingGameNotes.value = false;
    speechRecognition?.stop();
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
