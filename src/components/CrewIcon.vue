<template>
  <div
    class="flex items-center justify-center rounded"
    :class="[
      `bg-player-${color}`,
      autoWidth === true ? 'w-full' : 'w-8',
      autoHeight === true ? 'h-full' : 'h-8',
    ]"
  >
    <span class="text-xs bg-white">{{ color }}</span>
  </div>
</template>
<script>
export default {
  name: "CrewIcon",
  props: {
    color: {
      type: String,
      required: true,
    },
    autoWidth: {
      type: Boolean,
      default: false,
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
