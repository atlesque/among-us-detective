<template>
  <div>
    <div class="flex mb-2">
      <button
        v-show="isMapVisible === false"
        @click="isMapVisible = true"
        class="button-sm"
      >
        Show map
      </button>
      <button
        v-show="isMapVisible === true"
        @click="isMapVisible = false"
        class="mr-8 button-sm"
      >
        Hide map
      </button>
      <div v-show="isMapVisible === true" class="flex">
        <button
          @click="selectMap('the-skeld')"
          class="mr-2 button-sm"
          :class="{ 'font-bold': selectedMap === 'the-skeld' }"
        >
          The Skeld
        </button>
        <button
          @click="selectedMap = 'mira-hq'"
          class="mr-2 button-sm"
          :class="{ 'font-bold': selectedMap === 'mira-hq' }"
        >
          Mira HQ
        </button>
        <button
          @click="selectedMap = 'polus'"
          class="button-sm"
          :class="{ 'font-bold': selectedMap === 'polus' }"
        >
          Polus
        </button>
      </div>
    </div>
    <div v-show="isMapVisible">
      <img
        v-show="selectedMap === 'the-skeld'"
        src="@/assets/images/maps/the-skeld.jpg"
        alt="The Skeld Map"
      />
      <img
        v-show="selectedMap === 'mira-hq'"
        src="@/assets/images/maps/mira-hq.jpg"
        alt="Mira HQ Map"
      />
      <img
        v-show="selectedMap === 'polus'"
        src="@/assets/images/maps/polus.jpg"
        alt="Polus Map"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Maps",
  data() {
    return {
      isMapVisible: false,
      selectedMap: "the-skeld",
    };
  },
  methods: {
    selectMap(newMap) {
      this.selectedMap = newMap;
      this.$gtag.event("change_map", {
        event_category: "global_stats",
        value: newMap,
      });
    },
  },
};
</script>
