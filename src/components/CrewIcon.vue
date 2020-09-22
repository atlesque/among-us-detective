<template>
  <div
    class="relative flex items-center justify-center rounded"
    :class="[
      showColorNames === true ? `bg-player-${color}` : '',
      autoWidth === true ? 'w-full' : 'w-8',
      autoHeight === true ? 'h-full' : 'h-8',
    ]"
  >
    <span v-if="showColorNames === true" class="text-xs bg-white">{{
      color
    }}</span>
    <template v-else>
      <img
        :src="require(`@/assets/images/player/${color}-trans.png`)"
        :alt="color"
        :title="color"
        class="z-10"
      />
    </template>
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
    showColorNames: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
