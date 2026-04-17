<template>
  <div>
    <div class="flex flex-col mb-2 md:flex-row">
      <button
        v-show="!isMapVisible"
        class="self-start py-1 button-sm"
        data-test="toggle-map-btn"
        @click="isMapVisible = true"
      >
        Show map
      </button>
      <button
        v-show="isMapVisible"
        class="self-start py-1 md:rounded-r-none button-sm"
        data-test="toggle-map-btn"
        @click="isMapVisible = false"
      >
        Hide map
      </button>
      <div
        v-show="isMapVisible"
        class="flex self-start p-1 mt-2 rounded md:rounded-l-none bg-theme-blue-dark md:mt-0"
      >
        <MapSelector :selected-map="mapsStore.selectedMap" @map-selected="selectMap" />
      </div>
    </div>
    <div v-show="isMapVisible" class="mx-auto map-container" data-test="map-container">
      <MapPlayerTracker class="z-10" />
      <div
        class="map-picture-container"
        :class="{
          'map-picture-container--lighter':
            settingsStore.isImproveMapContrastEnabled &&
            !(mapsStore.selectedMap === 'mira-hq' && areSensorsVisible),
        }"
      >
        <picture v-show="mapsStore.selectedMap === 'the-skeld'">
          <source srcset="~/assets/images/maps/the-skeld.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-skeld.png" type="image/png" />
          <img src="~/assets/images/maps/the-skeld.png" alt="The Skeld Map" />
        </picture>
        <div v-show="mapsStore.selectedMap === 'mira-hq'" class="relative z-0">
          <div class="absolute inset-0 z-10">
            <button
              class="absolute right-0 m-2 button-sm"
              data-test="toggle-sensors-btn"
              @click="areSensorsVisible = !areSensorsVisible"
            >
              {{ areSensorsVisible ? 'Hide sensors' : 'Show sensors' }}
            </button>
            <MiraHqOverlay v-show="areSensorsVisible" />
          </div>
          <picture>
            <source srcset="~/assets/images/maps/mira-hq.webp" type="image/webp" />
            <source srcset="~/assets/images/maps/mira-hq.png" type="image/png" />
            <img src="~/assets/images/maps/mira-hq.png" alt="Mira HQ Map" />
          </picture>
        </div>
        <picture v-show="mapsStore.selectedMap === 'polus'">
          <source srcset="~/assets/images/maps/polus.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/polus.png" type="image/png" />
          <img src="~/assets/images/maps/polus.png" alt="Polus Map" />
        </picture>
        <picture v-show="mapsStore.selectedMap === 'the-airship'">
          <source srcset="~/assets/images/maps/the-airship.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-airship.png" type="image/png" />
          <img src="~/assets/images/maps/the-airship.png" alt="The Airship Map" />
        </picture>
        <picture v-show="mapsStore.selectedMap === 'the-fungle'">
          <source srcset="~/assets/images/maps/the-fungle.webp" type="image/webp" />
          <source srcset="~/assets/images/maps/the-fungle.png" type="image/png" />
          <img src="~/assets/images/maps/the-fungle.png" alt="The Fungle Map" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mapsStore = useMapsStore()
const notesStore = useNotesStore()
const settingsStore = useSettingsStore()
const { gtag } = useGtag()

const isMapVisible = ref(false)
const areSensorsVisible = ref(false)

function selectMap(newMap: string) {
  mapsStore.setSelectedMap(newMap)
  gtag('event', `change_map_${newMap}`, { event_category: 'global_stats' })
}

onMounted(() => {
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    if (
      e.code === 'KeyM' &&
      !notesStore.areNotesOpen &&
      !settingsStore.settingsModalOpenState
    ) {
      isMapVisible.value = !isMapVisible.value
    }
  })
})
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
  picture {
    pointer-events: none;
  }
  &--lighter img {
    opacity: 0.75;
  }
}
</style>
