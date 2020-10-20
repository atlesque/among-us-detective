<template>
  <div class="flex flex-col">
    <div class="my-2 round-notes-wrapper">
      <div class="flex justify-between">
        <div class="flex items-center justify-center ">
          <label
            for="round-notes"
            class="block mr-1 text-sm font-medium leading-5 text-gray-700"
            >This round
          </label>
          <!-- <button
            class="flex items-center justify-center w-8 h-8"
            @click="toggleRecordRoundNotes"
            :class="{
              'text-player-green': isRecordingRoundNotes === true,
            }"
          >
            <span class="icon-mic"></span>
          </button> -->
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

<script>
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
      /*global webkitSpeechRecognition */
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.maxAlternatives = 1;
      this.speechRecognition.lang = "en-US";
      this.speechRecognition.onstart = () => {
        console.log("Started speech recognition");
      };
      this.speechRecognition.onresult = event => {
        /* eslint-disable-next-line */
        var interim_transcript = "";
        var final_transcript = "";
        if (typeof event.results == "undefined") {
          this.speechRecognition.onend = null;
          this.speechRecognition.stop();
          return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        this.roundNotes += final_transcript;

        // const recognizedSpeechTranscript = event.results[0][0].transcript;
        const recognizedSpeechTranscript = final_transcript;
        console.log(`Recognized speech: ${recognizedSpeechTranscript}`);
      };
    },
    toggleRecordRoundNotes() {
      const newValue = !this.isRecordingRoundNotes;
      this.isRecordingRoundNotes = newValue;
      if (newValue === true) {
        this.enableRecordingNotes({ noteType: "round" });
      } else {
        this.disableRecordingNotes({ noteType: "round" });
      }
    },
    enableRecordingNotes({ noteType }) {
      console.log(`Started recording [${noteType}]`);
      this.speechRecognition.start();
    },
    disableRecordingNotes({ noteType }) {
      console.log(`Stopped recording [${noteType}]`);
      this.speechRecognition.stop();
    },
  },
};
</script>
