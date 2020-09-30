<template>
  <div class="flex flex-col">
    <div class="round-notes-wrapper">
      <div class="flex justify-between">
        <label
          for="round-notes"
          class="block text-sm font-medium leading-5 text-gray-700"
          >This round</label
        >
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
    };
  },
  mounted() {
    const playerHighlightColors = this.allColors.map(color => {
      return { highlight: color, className: `bg-player-${color}-light` };
    });
    new HighlightWithinTextarea(this.$refs["input-round-notes"], {
      highlight: playerHighlightColors,
    });
    new HighlightWithinTextarea(this.$refs["input-game-notes"], {
      highlight: playerHighlightColors,
    });
  },
  computed: {
    roundNotes: {
      get() {
        return this.round;
      },
      set(value) {
        this.$emit("roundNotesChanged", value);
      },
    },
    gameNotes: {
      get() {
        return this.game;
      },
      set(value) {
        this.$emit("gameNotesChanged", value);
      },
    },
  },
};
</script>
