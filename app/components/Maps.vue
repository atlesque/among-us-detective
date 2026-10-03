<template>
  <div>
    <div class="flex flex-col mb-2 md:flex-row items-start md:items-center gap-2">
      <button
        class="h-8 px-3 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 shadow-sm"
        :class="mapsStore.isMapVisible
          ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
          : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700/60'"
        data-test="toggle-map-btn"
        @click="mapsStore.toggleMap()"
      >
        <AppIcon name="map" class="w-3.5 h-3.5 shrink-0" />
        <span>{{ mapsStore.isMapVisible ? t('map.hide') : t('map.show') }}</span>
      </button>
      <div
        v-show="mapsStore.isMapVisible"
        class="flex items-center p-1 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
      >
        <MapSelector
          :selected-map="displayedMap"
          :disabled="roundsStore.isViewingHistory"
          @map-selected="selectMap"
        />
      </div>
    </div>
    <div
      v-show="mapsStore.isMapVisible"
      class="mx-auto map-container"
      data-test="map-container"
      :data-map-id="displayedMap"
    >
      <div
        v-if="!isHistoricalMapUnavailable"
        class="map-picture-container"
        :class="{
          'map-picture-container--lighter':
            settingsStore.isImproveMapContrastEnabled &&
            !(displayedMap === 'mira-hq' && areSensorsVisible),
        }"
      >
        <MapPlayerTracker :map-id="displayedMap" class="z-10" />
        <picture v-show="displayedMap === 'the-skeld'">
          <source srcset="~/assets/images/maps/the-skeld.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-skeld.png" type="image/png" />
          <img src="~/assets/images/maps/the-skeld.png" alt="The Skeld Map" />
        </picture>
        <div v-show="displayedMap === 'mira-hq'" class="relative z-0">
          <div class="absolute inset-0 z-10">
            <button
              class="absolute right-2 top-2 z-20 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all shadow-md flex items-center gap-1"
              :class="areSensorsVisible
                ? 'bg-amber-600 text-white border border-amber-500 hover:bg-amber-500'
                : 'bg-gray-900/90 text-gray-200 border border-gray-700 hover:bg-gray-800'"
              data-test="toggle-sensors-btn"
              @click="areSensorsVisible = !areSensorsVisible"
            >
              {{ areSensorsVisible ? t('map.hideSensors') : t('map.showSensors') }}
            </button>
            <MiraHqOverlay v-show="areSensorsVisible" />
          </div>
          <picture>
            <source srcset="~/assets/images/maps/mira-hq.webp" type="image/webp" />
            <source srcset="~/assets/images/maps/mira-hq.png" type="image/png" />
            <img src="~/assets/images/maps/mira-hq.png" alt="Mira HQ Map" />
          </picture>
        </div>
        <picture v-show="displayedMap === 'polus'">
          <source srcset="~/assets/images/maps/polus.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/polus.png" type="image/png" />
          <img src="~/assets/images/maps/polus.png" alt="Polus Map" />
        </picture>
        <picture v-show="displayedMap === 'the-airship'">
          <source srcset="~/assets/images/maps/the-airship.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-airship.png" type="image/png" />
          <img src="~/assets/images/maps/the-airship.png" alt="The Airship Map" />
        </picture>
        <picture v-show="displayedMap === 'the-fungle'">
          <source srcset="~/assets/images/maps/the-fungle.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-fungle.png" type="image/png" />
          <img src="~/assets/images/maps/the-fungle.png" alt="The Fungle Map" />
        </picture>
      </div>
      <div
        v-else
        class="map-snapshot-unavailable"
        data-test="map-snapshot-unavailable"
      >
        {{ t('map.snapshotUnavailable') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mapsStore = useMapsStore()
const roundsStore = useRoundsStore()
const settingsStore = useSettingsStore()
const { t } = useI18n()
const { gtag } = useGtag()

const areSensorsVisible = ref(false)

const isHistoricalMapUnavailable = computed(
  () => roundsStore.isViewingHistory && !mapsStore.isKnownMap(roundsStore.activeSnapshot?.mapId)
)

const displayedMap = computed(() => {
  if (!roundsStore.isViewingHistory) return mapsStore.selectedMap
  const snapshotMap = roundsStore.activeSnapshot?.mapId
  return mapsStore.isKnownMap(snapshotMap) ? snapshotMap : ''
})

function selectMap(newMap: string) {
  mapsStore.setSelectedMap(newMap)
  gtag('event', `change_map_${newMap}`, { event_category: 'global_stats' })
}
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
.map-picture-container {
  position: relative;
  width: 100%;

  picture {
    display: block;
    pointer-events: none;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  &--lighter img {
    opacity: 0.75;
  }
}
.map-snapshot-unavailable {
  min-height: 200px;
  display: grid;
  place-items: center;
  padding: 2rem;
  color: #fbbf24;
  text-align: center;
  border: 1px dashed rgba(251, 191, 36, 0.45);
  border-radius: 0.75rem;
  background: rgba(17, 24, 39, 0.8);
}
</style>
