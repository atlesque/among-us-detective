<template>
  <div class="flex flex-col">
    <div class="my-2 round-notes-wrapper">
      <span class="text-sm text-theme-red">{{ speechError }}</span>
      <div class="flex justify-between">
        <div class="flex items-center justify-center">
          <label
            for="round-notes"
            class="block mr-1 text-sm font-medium leading-5 text-gray-700"
            >This round
          </label>
          <button
            class="relative flex items-center justify-center w-8 h-8 record-round-button"
            @click="toggleRecordRoundNotes"
            :class="{
              'text-player-green': isRecordingRoundNotes === true,
              'text-player-red': speechError.length > 0,
            }"
          >
            <span class="icon-mic"></span>
          </button>
        </div>
        <span class="text-xs leading-5 text-gray-500">Cleared each round</span>
      </div>
      <div class="relative mt-1 rounded-md">
        <AutoSizingTextarea>
          <textarea
            id="round-notes"
            ref="input-round-notes"
            placeholder="e.g. Red saw me do medbay"
            rows="5"
            v-model="roundNotes"
          />
        </AutoSizingTextarea>
      </div>
    </div>
    <div class="game-notes-wrapper">
      <div class="flex justify-between">
        <label
          for="game-notes"
          class="block text-sm font-medium leading-5 text-gray-700"
          >This game</label
        >
        <span class="text-xs leading-5 text-gray-500">Cleared each game</span>
      </div>
      <div class="relative w-full mt-1">
        <AutoSizingTextarea>
          <textarea
            id="game-notes"
            ref="input-game-notes"
            placeholder="e.g. Orange and cyan are a group"
            rows="5"
            v-model="gameNotes"
          />
        </AutoSizingTextarea>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record-round-button {
  bottom: 5px;
}
</style>

<script>
/*global webkitSpeechRecognition webkitSpeechGrammarList */

import HighlightWithinTextarea from "@/utilities/highlight-within-textarea.js";
import allColors from "@/config/playerColors.js";
// Don't use lazy-loading syntax for this, otherwise Highlight won't work
import AutoSizingTextarea from "@/components/AutoSizingTextarea.vue";

export default {
  name: "Notes",
  components: {
    AutoSizingTextarea,
  },
  props: {
    round: {
      type: String,
      default: "",
    },
    game: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      allColors,
      isRecordingRoundNotes: false,
      speechRecognition: null,
      roundNotesHighlighter: null,
      gameNotesHighlighter: null,
      speechError: "",
    };
  },
  mounted() {
    const playerHighlightColors = this.allColors.map(color => {
      return { highlight: color, className: `bg-player-${color}-light` };
    });
    this.roundNotesHighlighter = new HighlightWithinTextarea(
      this.$refs["input-round-notes"],
      {
        highlight: playerHighlightColors,
      }
    );
    this.gameNotesHighlighter = new HighlightWithinTextarea(
      this.$refs["input-game-notes"],
      {
        highlight: playerHighlightColors,
      }
    );
    this.initSpeechRecording();
    this.$refs["input-round-notes"].focus();
  },
  computed: {
    roundNotes: {
      get() {
        return this.round;
      },
      set(value) {
        this.$emit("roundNotesChanged", value);
        this.roundNotesHighlighter.handleInput();
      },
    },
    gameNotes: {
      get() {
        return this.game;
      },
      set(value) {
        this.$emit("gameNotesChanged", value);
        this.gameNotesHighlighter.handleInput();
      },
    },
  },
  methods: {
    initSpeechRecording() {
      if (webkitSpeechRecognition == null) {
        return;
      }
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.maxAlternatives = 1;
      this.speechRecognition.lang = "en-US";

      /* 
        NOTE:
        Chrome does not support webkitSpeechGrammarList
        (last checked 2020-10-21)
        
        More info:
        https://github.com/WICG/speech-api/issues/57
        https://github.com/WICG/speech-api/issues/58

        Leaving this in just in case it gets implemented one day
      */
      if (webkitSpeechGrammarList != null) {
        const grammar =
          "#JSGF V1.0; grammar colors; public <color> = " +
          allColors.join(" | ") +
          " ;";
        const speechRecognitionList = new webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        this.speechRecognition.grammars = speechRecognitionList;
      }

      this.speechRecognition.onstart = () => {
        this.speechError = "";
      };

      this.speechRecognition.onresult = event => {
        var finalTranscript = "";
        this.speechError = "";
        if (typeof event.results == "undefined") {
          this.speechRecognition.onend = null;
          this.speechRecognition.stop();
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        this.roundNotes += finalTranscript.replace(
          /newline|new line|enter/gi,
          "\n"
        );
        this.roundNotesHighlighter.handleInput();
      };

      this.speechRecognition.onerror = event => {
        if (event.error == "no-speech") {
          this.speechError = "No speech detected";
        }
        if (event.error == "audio-capture") {
          this.speechError = "Check your recording device";
        }
        if (event.error == "not-allowed") {
          this.speechError = "Check recording permissions in your browser";
        }
        this.disableRecordingNotes();
      };
    },
    toggleRecordRoundNotes() {
      const newValue = !this.isRecordingRoundNotes;
      if (newValue === true) {
        this.enableRecordingNotes();
      } else {
        this.disableRecordingNotes();
      }
    },
    enableRecordingNotes() {
      this.isRecordingRoundNotes = true;
      this.speechRecognition.start();
    },
    disableRecordingNotes() {
      this.isRecordingRoundNotes = false;
      this.speechRecognition.stop();
      this.roundNotesHighlighter.handleInput();
      setTimeout(() => {
        this.$refs["input-round-notes"].scrollTop = this.$refs[
          "input-round-notes"
        ].scrollHeight;
      }, 500);
    },
  },
};
</script>
