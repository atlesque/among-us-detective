<template>
  <div class="flex map-selector" data-test="map-selector">
    <button
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-skeld' }"
      data-test="map-btn-the-skeld"
      @click="emit('mapSelected', 'the-skeld')"
    >
      The Skeld
    </button>
    <button
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'mira-hq' }"
      data-test="map-btn-mira-hq"
      @click="emit('mapSelected', 'mira-hq')"
    >
      Mira HQ
    </button>
    <button
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'polus' }"
      data-test="map-btn-polus"
      @click="emit('mapSelected', 'polus')"
    >
      Polus
    </button>
    <button
      class="mr-1 button-sm"
      :class="{ 'active button-success': selectedMap === 'the-airship' }"
      data-test="map-btn-the-airship"
      @click="emit('mapSelected', 'the-airship')"
    >
      The Airship
    </button>
    <button
      class="button-sm"
      :class="{ 'active button-success': selectedMap === 'the-fungle' }"
      data-test="map-btn-the-fungle"
      @click="emit('mapSelected', 'the-fungle')"
    >
      The Fungle
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ selectedMap?: string }>()
const emit = defineEmits<{ mapSelected: [map: string] }>()
</script>
