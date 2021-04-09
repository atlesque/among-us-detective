<template>
  <div>
    <div class="flex flex-col mb-2 md:flex-row">
      <button
        v-show="isMapVisible === false"
        @click="isMapVisible = true"
        class="self-start py-1 button-sm"
      >
        Show map
      </button>
      <button
        v-show="isMapVisible === true"
        @click="isMapVisible = false"
        class="self-start py-1 md:rounded-r-none button-sm"
      >
        Hide map
      </button>
      <div
        v-show="isMapVisible === true"
        class="flex self-start p-1 mt-2 rounded md:rounded-l-none bg-theme-blue-dark md:mt-0"
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
          class="mr-2 button-sm"
          :class="{ 'active button-success': selectedMap === 'polus' }"
        >
          Polus
        </button>
        <button
          @click="selectMap('airship')"
          class="button-sm"
          :class="{ 'active button-success': selectedMap === 'airship' }"
        >
          Airship
        </button>
      </div>
    </div>
    <div v-show="isMapVisible" class="mx-auto map-container">
      <MapPlayerTracker class="z-10" />
      <div
        class="map-picture-container"
        :class="{
          'opacity-50':
            isImproveMapContrastEnabled === true &&
            !(selectedMap === 'mira-hq' && areSensorsVisible === true),
        }"
      >
        <picture v-show="selectedMap === 'the-skeld'">
          <source
            srcset="@/assets/images/maps/the-skeld.webp"
            type="image/webp"
          />
          <source
            srcset="@/assets/images/maps/the-skeld.png"
            type="image/png"
          />
          <img src="@/assets/images/maps/the-skeld.png" alt="The Skeld Map" />
        </picture>
        <div class="relative z-0" v-show="selectedMap === 'mira-hq'">
          <div class="absolute inset-0 z-10">
            <button
              @click="areSensorsVisible = !areSensorsVisible"
              class="absolute right-0 m-2 button-sm"
            >
              {{ areSensorsVisible === true ? "Hide sensors" : "Show sensors" }}
            </button>
            <MiraHqOverlay v-show="areSensorsVisible === true" />
          </div>
          <picture>
            <source
              srcset="@/assets/images/maps/mira-hq.webp"
              type="image/webp"
            />
            <source
              srcset="@/assets/images/maps/mira-hq.png"
              type="image/png"
            />
            <img src="@/assets/images/maps/mira-hq.png" alt="Mira HQ Map" />
          </picture>
        </div>
        <picture v-show="selectedMap === 'polus'">
          <source srcset="@/assets/images/maps/polus.webp" type="image/webp" />
          <source srcset="@/assets/images/maps/polus.png" type="image/png" />
          <img src="@/assets/images/maps/polus.png" alt="Polus Map" />
        </picture>
        <picture v-show="selectedMap === 'airship'">
          <source
            srcset="@/assets/images/maps/airship.webp"
            type="image/webp"
          />
          <source srcset="@/assets/images/maps/airship.png" type="image/png" />
          <img src="@/assets/images/maps/airship.png" alt="Airship Map" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const MapPlayerTracker = () => import("@/components/MapPlayerTracker.vue");
const MiraHqOverlay = () => import("@/components/MiraHqOverlay.vue");

export default {
  name: "Maps",
  components: {
    MapPlayerTracker,
    MiraHqOverlay,
  },
  mounted() {
    document.addEventListener("keyup", e => {
      if (
        e.code === "KeyM" &&
        this.areNotesOpen === false &&
        this.settingsModalOpenState === false
      ) {
        this.isMapVisible = !this.isMapVisible;
      }
    });
  },
  data() {
    return {
      isMapVisible: false,
      areSensorsVisible: false,
      selectedMap: "the-skeld",
    };
  },
  computed: {
    ...mapState("notes", ["areNotesOpen"]),
    ...mapState("settings", [
      "settingsModalOpenState",
      "isImproveMapContrastEnabled",
    ]),
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
.map-container {
  max-width: 1366px;
}
</style>
