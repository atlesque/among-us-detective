<template>
  <div>
    <div class="flex">
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
        <button @click="selectedMap = 'the-skeld'" class="mr-2 button-sm">
          The Skeld
        </button>
        <button @click="selectedMap = 'mira-hq'" class="mr-2 button-sm">
          Mira HQ
        </button>
        <button @click="selectedMap = 'polus'" class="button-sm">
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
};
</script>
