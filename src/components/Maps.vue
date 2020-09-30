<template>
  <div>
    <div class="flex mb-2">
      <button
        v-show="isMapVisible === false"
        @click="isMapVisible = true"
        class="py-1 button-sm"
      >
        Show map
      </button>
      <button
        v-show="isMapVisible === true"
        @click="isMapVisible = false"
        class="rounded-r-none button-sm"
      >
        Hide map
      </button>
      <div
        v-show="isMapVisible === true"
        class="flex p-1 rounded-r bg-theme-blue-dark"
      >
        <button
          @click="selectMap('the-skeld')"
          class="mr-2 button-sm"
          :class="{ 'active button-success': selectedMap === 'the-skeld' }"
        >
          The Skeld
        </button>
        <button
          @click="selectMap('mira-hq')"
          class="mr-2 button-sm"
          :class="{ 'active button-success': selectedMap === 'mira-hq' }"
        >
          Mira HQ
        </button>
        <button
          @click="selectMap('polus')"
          class="button-sm"
          :class="{ 'active button-success': selectedMap === 'polus' }"
        >
          Polus
        </button>
      </div>
    </div>
    <div v-show="isMapVisible">
      <picture v-show="selectedMap === 'the-skeld'">
        <source
          srcset="@/assets/images/maps/small/the-skeld.webp"
          type="image/webp"
        />
        <source
          srcset="@/assets/images/maps/small/the-skeld.jpg"
          type="image/jpeg"
        />
        <img
          src="@/assets/images/maps/small/the-skeld.jpg"
          alt="The Skeld Map"
        />
      </picture>
      <picture v-show="selectedMap === 'mira-hq'">
        <source
          srcset="@/assets/images/maps/small/mira-hq.webp"
          type="image/webp"
        />
        <source
          srcset="@/assets/images/maps/small/mira-hq.jpg"
          type="image/jpeg"
        />
        <img src="@/assets/images/maps/small/mira-hq.jpg" alt="Mira HQ Map" />
      </picture>
      <picture v-show="selectedMap === 'polus'">
        <source
          srcset="@/assets/images/maps/small/polus.webp"
          type="image/webp"
        />
        <source
          srcset="@/assets/images/maps/small/polus.jpg"
          type="image/jpeg"
        />
        <img src="@/assets/images/maps/small/polus.jpg" alt="Polus Map" />
      </picture>
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
      this.$gtag.event(`change_map_${newMap}`, {
        event_category: "global_stats",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  &.active {
    @apply font-bold;
  }
}
</style>
