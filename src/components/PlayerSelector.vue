<template>
  <div class="flex">
    <button
      class="flex items-center justify-center w-full h-full rounded button"
      :class="`bg-player-${currentColor}`"
      @click="isPlayerPickerOpen = true"
    >
      <span class="px-1 text-black bg-white rounded">My player</span>
    </button>
    <Modal
      v-if="isPlayerPickerOpen === true"
      @close="isPlayerPickerOpen = false"
    >
      <template slot="title">Choose your color</template>
      <template slot="body">
        <div class="grid w-full grid-cols-4 gap-1 my-4 grid-auto-flow">
          <button
            v-for="color in playerColors"
            :key="color"
            class="flex items-center justify-center p-4 rounded color-icon"
            :class="[
              `bg-player-${color}`,
              {
                'color-icon--selected': color === selectedColor,
              },
            ]"
            @click="selectPlayerColor(color)"
          >
            <span class="px-1 text-black bg-white rounded color-name">{{
              color
            }}</span>
          </button>
        </div>
        <div class="flex items-center">
          <label class="mb-0 mr-2">Imposter mode:</label>
          <Checkbox
            :isChecked="isImposter"
            @changed="value => (isImposter = value)"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import availableColors from "@/config/playerColors.js";
import { mapGetters, mapActions } from "vuex";
const Modal = () => import("@/components/Modal.vue");
const Checkbox = () => import("@/components/Checkbox.vue");

export default {
  name: "PlayerSelector",
  components: {
    Modal,
    Checkbox,
  },
  props: {
    currentColor: {
      type: String,
      default: "yellow",
    },
    isPickerOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      playerColors: availableColors,
      selectedColor: this.currentColor,
    };
  },
  computed: {
    ...mapGetters("crew", ["isPlayerImposter", "playerCrewMember"]),
    isPlayerPickerOpen: {
      get() {
        return this.isPickerOpen;
      },
      set(value) {
        this.$emit("pickerToggle", value);
      },
    },
    isImposter: {
      get() {
        return this.isPlayerImposter;
      },
      set(value) {
        this.setMemberIsImposter({
          member: this.playerCrewMember,
          isImposter: value,
        });
      },
    },
  },
  methods: {
    ...mapActions("crew", ["setMemberIsImposter"]),
    selectPlayerColor(color) {
      this.selectedColor = color;
      this.$emit("colorChanged", this.selectedColor);
    },
    closeModal() {
      this.isPlayerPickerOpen = false;
    },
  },
  watch: {
    currentColor(newColor) {
      this.selectedColor = newColor;
    },
  },
};
</script>

<style lang="scss" scoped>
.color-icon {
  &--selected {
    box-shadow: 0 0 0 3px black;

    .color-name {
      @apply bg-black;
      @apply text-white;
      box-shadow: 0 0 0 3px black;
    }
  }
}
</style>
