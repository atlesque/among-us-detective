<template>
  <div class="flex map-selector">
    <button
      @click="selectMap('the-skeld')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-skeld' }"
    >
      The Skeld
    </button>
    <button
      @click="selectMap('mira-hq')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'mira-hq' }"
    >
      Mira HQ
    </button>
    <button
      @click="selectMap('polus')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'polus' }"
    >
      Polus
    </button>
    <button
      @click="selectMap('the-airship')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-airship' }"
    >
      The Airship
    </button>
    <button
      @click="selectMap('the-fungle')"
      class="button-sm"
      :class="{ 'active button-success': selectedMap === 'the-fungle' }"
    >
      The Fungle
    </button>
  </div>
</template>

<script>
export default {
  name: "MapSelector",
  props: {
    selectedMap: {
      type: String,
      default: "the-skeld",
    },
  },
  methods: {
    selectMap(map) {
      this.$emit("mapSelected", map);
    },
  },
};
</script>
