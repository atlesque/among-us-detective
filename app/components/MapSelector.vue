<template>
  <div class="flex flex-wrap items-center gap-1 map-selector" data-test="map-selector">
    <button
      class="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="disabled"
      :class="selectedMap === 'the-skeld'
        ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
      data-test="map-btn-the-skeld"
      @click="emit('mapSelected', 'the-skeld')"
    >
      The Skeld
    </button>
    <button
      class="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="disabled"
      :class="selectedMap === 'mira-hq'
        ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
      data-test="map-btn-mira-hq"
      @click="emit('mapSelected', 'mira-hq')"
    >
      Mira HQ
    </button>
    <button
      class="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="disabled"
      :class="selectedMap === 'polus'
        ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
      data-test="map-btn-polus"
      @click="emit('mapSelected', 'polus')"
    >
      Polus
    </button>
    <button
      class="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="disabled"
      :class="selectedMap === 'the-airship'
        ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
      data-test="map-btn-the-airship"
      @click="emit('mapSelected', 'the-airship')"
    >
      The Airship
    </button>
    <button
      class="px-2.5 py-1 text-xs font-semibold rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="disabled"
      :class="selectedMap === 'the-fungle'
        ? 'bg-emerald-600 text-white shadow-sm border border-emerald-500'
        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700/60'"
      data-test="map-btn-the-fungle"
      @click="emit('mapSelected', 'the-fungle')"
    >
      The Fungle
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ selectedMap?: string; disabled?: boolean }>()
const emit = defineEmits<{ mapSelected: [map: string] }>()
</script>
