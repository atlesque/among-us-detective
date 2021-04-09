<template>
  <div class="flex flex-col">
    <div v-show="showRoundNotes === true" class="my-2 round-notes-wrapper">
      <span class="text-sm text-theme-red">{{ speechError }}</span>
      <div class="flex justify-between">
        <div class="flex items-center justify-center">
          <label
            for="round-notes"
            class="block mr-1 text-sm font-medium leading-5 text-gray-700"
            >This round
          </label>
          <button
            v-if="isSpeechRecognitionSupported === true"
            class="relative flex items-center justify-center w-8 h-8 record-round-button"
            @click="toggleRecordRoundNotes"
            :class="{
              'text-player-green': isRecordingRoundNotes === true,
              'text-player-red':
                lastRecordedType === 'roundNotes' && speechError.length > 0,
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
        <div class="flex items-center justify-center">
          <label
            for="game-notes"
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            <template v-if="resetNotesOnNewGame === true">This game</template>
            <template v-else>General</template>
          </label>
          <button
            v-if="isSpeechRecognitionSupported === true"
            class="relative flex items-center justify-center w-8 h-8 record-round-button"
            @click="toggleRecordGameNotes"
            :class="{
              'text-player-green': isRecordingGameNotes === true,
              'text-player-red':
                lastRecordedType === 'gameNotes' && speechError.length > 0,
            }"
          >
            <span class="icon-mic"></span>
          </button>
        </div>
        <span class="text-xs leading-5 text-gray-500"
          ><template v-if="resetNotesOnNewGame === true"
            >Cleared each game</template
          >
          <template v-else>Never cleared</template></span
        >
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

import { mapState } from "vuex";
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
      isRecordingGameNotes: false,
      speechRecognition: null,
      roundNotesHighlighter: null,
      gameNotesHighlighter: null,
      speechError: "",
      lastRecordedType: "",
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
    ...mapState("settings", ["resetNotesOnNewGame", "showRoundNotes"]),
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
    isSpeechRecognitionSupported() {
      return typeof webkitSpeechRecognition !== "undefined";
    },
  },
  methods: {
    initSpeechRecording() {
      if (this.isSpeechRecognitionSupported === false) {
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

        if (this.lastRecordedType === "roundNotes") {
          this.roundNotes += finalTranscript.replace(
            /newline|new line|enter/gi,
            "\n"
          );
          this.roundNotesHighlighter.handleInput();
        } else {
          this.gameNotes += finalTranscript.replace(
            /newline|new line|enter/gi,
            "\n"
          );
          this.gameNotesHighlighter.handleInput();
        }
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
        this.disableRecordingRoundNotes();
        this.disableRecordingGameNotes();
      };
    },
    toggleRecordRoundNotes() {
      const newValue = !this.isRecordingRoundNotes;
      if (newValue === true) {
        this.enableRecordingRoundNotes();
      } else {
        this.disableRecordingRoundNotes();
      }
    },
    enableRecordingRoundNotes() {
      this.isRecordingRoundNotes = true;
      this.lastRecordedType = "roundNotes";
      this.speechRecognition.start();
    },
    disableRecordingRoundNotes() {
      this.isRecordingRoundNotes = false;
      this.speechRecognition.stop();
      this.roundNotesHighlighter.handleInput();
      setTimeout(() => {
        this.$refs["input-round-notes"].scrollTop = this.$refs[
          "input-round-notes"
        ].scrollHeight;
      }, 500);
    },
    toggleRecordGameNotes() {
      const newValue = !this.isRecordingGameNotes;
      if (newValue === true) {
        this.enableRecordingGameNotes();
      } else {
        this.disableRecordingGameNotes();
      }
    },
    enableRecordingGameNotes() {
      this.isRecordingGameNotes = true;
      this.lastRecordedType = "gameNotes";
      this.speechRecognition.start();
    },
    disableRecordingGameNotes() {
      this.isRecordingGameNotes = false;
      this.speechRecognition.stop();
      this.gameNotesHighlighter.handleInput();
      setTimeout(() => {
        this.$refs["input-game-notes"].scrollTop = this.$refs[
          "input-game-notes"
        ].scrollHeight;
      }, 500);
    },
  },
};
</script>
