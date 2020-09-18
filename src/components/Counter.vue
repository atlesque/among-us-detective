<template>
  <div class="flex justify-between">
    <span class="text-2xl">{{ currentCount }}</span>
    <div class="flex">
      <button
        class="self-center mr-2 button-sm button-success"
        @click="increaseCount()"
      >
        +
      </button>
      <button
        class="self-center button-sm button-danger"
        @click="decreaseCount()"
      >
        -
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Counter",
  data() {
    return {
      currentCount: 0,
    };
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
  },
};
</script>
