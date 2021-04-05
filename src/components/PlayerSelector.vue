<template>
  <div class="flex h-12 w-36">
    <button
      class="flex items-center justify-center w-full h-full rounded button"
      :class="`bg-player-${currentColor}`"
      @click="isPlayerPickerOpen = true"
    >
      <span class="px-1 text-black bg-white rounded">My color</span>
    </button>
    <!-- <div
      v-else
      class="grid flex-1 grid-cols-6 grid-rows-2 gap-1 grid-auto-flow"
    >
      <button
        v-for="color in playerColors"
        :key="color"
        :class="`bg-player-${color}`"
        class="rounded"
        @click="selectPlayerColor(color)"
      ></button>
    </div> -->
    <Modal
      v-if="isPlayerPickerOpen === true"
      @close="isPlayerPickerOpen = false"
    >
      <template slot="title">Choose your color</template>
      <template slot="body">
        <div class="grid w-full grid-cols-4 gap-1 grid-auto-flow">
          <button
            v-for="color in playerColors"
            :key="color"
            :class="`bg-player-${color}`"
            class="flex items-center justify-center p-4 rounded"
            @click="selectPlayerColor(color)"
          >
            <span class="px-1 text-black bg-white rounded">{{ color }}</span>
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import availableColors from "@/config/playerColors.js";
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "PlayerSelector",
  components: {
    Modal,
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
    };
  },
  computed: {
    isPlayerPickerOpen: {
      get() {
        return this.isPickerOpen;
      },
      set(value) {
        this.$emit("pickerToggle", value);
      },
    },
  },
  methods: {
    selectPlayerColor(selectedColor) {
      this.$emit("colorChanged", selectedColor);
      this.isPlayerPickerOpen = false;
    },
  },
};
</script>
