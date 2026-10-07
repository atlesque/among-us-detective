<template>
  <Modal @close="emit('close')">
    <template #title>Among Us Detective 2.0 is here!</template>
    <template #body>
      <p class="py-4 text-sm leading-5 text-theme-gray-dark" data-test="v2-announcement-text">
        A fresh new look, Impostor mode, role tracking, round history and more.
        Give it a try!
      </p>
      <div class="flex justify-between">
        <button class="button" data-test="v2-announcement-later-btn" @click="emit('close')">
          Maybe later
        </button>
        <a
          :href="V2_URL"
          target="_blank"
          rel="noopener"
          class="button button-success"
          data-test="v2-announcement-try-btn"
          @click="handleTryV2"
        >
          Try V2
        </a>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
// TODO: confirm the V2 subdomain before merging
const V2_URL = 'https://v2.amongusdetective.com'

const emit = defineEmits<{ close: [] }>()
const { gtag } = useGtag()

function handleTryV2() {
  gtag('event', 'click_try_v2', { event_category: 'global_stats' })
  emit('close')
}
</script>
