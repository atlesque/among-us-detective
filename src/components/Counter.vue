<template>
  <div class="flex justify-between">
    <div class="flex items-center justify-center flex-1">
      <span
        class="p-1 text-2xl"
        :class="numberClass"
        @dblclick="resetCount()"
        >{{ currentCount }}</span
      >
    </div>
    <div class="flex flex-col" v-show="isDisabled === false">
      <button
        class="flex items-center justify-center mb-1 shadow button-sm button-success"
        @click="increaseCount()"
      >
        <span>+</span>
      </button>
      <button
        class="flex items-center justify-center shadow button-sm button-danger"
        @click="decreaseCount()"
      >
        <span>-</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Counter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentCount: {
      get() {
        return this.count;
      },
      set(value) {
        this.$emit("changed", value);
      },
    },
    numberClass() {
      if (this.currentCount >= 2) {
        return "text-player-red font-bold";
      } else if (0 < this.currentCount && this.currentCount < 2) {
        return "text-theme-black";
      } else {
        return "text-theme-gray-light";
      }
    },
  },
  methods: {
    increaseCount() {
      this.currentCount++;
    },
    decreaseCount() {
      if (this.currentCount > 0) {
        this.currentCount--;
      }
    },
    resetCount() {
      this.currentCount = 0;
    },
  },
};
</script>
