<template>
  <div
    class="relative flex items-center justify-center rounded"
    :class="[
      showColorNames === true ? `bg-player-${color}` : '',
      autoWidth === true ? 'w-full' : 'w-10',
      autoHeight === true ? 'h-full' : 'h-8',
    ]"
  >
    <span
      v-if="showColorNames === true"
      :class="`border-2 border-player-${color}`"
      class="w-full text-xs text-center bg-white dark--text-dark"
      >{{ color }}</span
    >
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
