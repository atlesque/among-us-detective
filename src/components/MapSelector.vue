<template>
  <div class="flex map-selector" data-test="map-selector">
    <button
      @click="selectMap('the-skeld')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-skeld' }"
      data-test="map-btn-the-skeld"
    >
      The Skeld
    </button>
    <button
      @click="selectMap('mira-hq')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'mira-hq' }"
      data-test="map-btn-mira-hq"
    >
      Mira HQ
    </button>
    <button
      @click="selectMap('polus')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'polus' }"
      data-test="map-btn-polus"
    >
      Polus
    </button>
    <button
      @click="selectMap('the-airship')"
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-airship' }"
      data-test="map-btn-the-airship"
    >
      The Airship
    </button>
    <button
      @click="selectMap('the-fungle')"
      class="button-sm"
      :class="{ 'active button-success': selectedMap === 'the-fungle' }"
      data-test="map-btn-the-fungle"
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
