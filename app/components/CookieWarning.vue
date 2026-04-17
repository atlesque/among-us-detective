<template>
  <section
    v-if="isVisible"
    class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center p-4 bg-white border-t cookie-warning md:px-4"
  >
    <div class="flex flex-wrap items-center justify-around w-full max-w-2xl">
      <span class="mb-4 text-center font-regular">
        By using this site, you agree to send anonymous tracking data to help with development.
      </span>
      <button class="font-bold text-theme-green btn" @click="acceptCookies">Dismiss</button>
    </div>
  </section>
</template>

<script setup lang="ts">
const isVisible = ref(true)

onMounted(() => {
  const hasAccepted = JSON.parse(localStorage.getItem('acceptedCookies') ?? 'false')
  if (hasAccepted === true) isVisible.value = false
})

function acceptCookies() {
  localStorage.setItem('acceptedCookies', 'true')
  isVisible.value = false
}
</script>
