<template>
  <div class="flex">
    <Modal @close="handleCloseEvent">
      <template #title>{{ isFeedbackScreenOpen ? 'Feedback' : 'About' }}</template>
      <template #body>
        <template v-if="isFeedbackScreenOpen">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSda7OlGq68xKkVyx3GsZZntwrGN_CZZJRidgCl5J6R1QIyB2g/viewform?embedded=true"
            width="100%"
            height="520"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >Loading…</iframe>
        </template>
        <template v-else>
          <p>📝 Among Us Detective is digital notebook for Among Us</p>
          <p>🙈 This tool is <b>not</b> a hack</p>
          <p>
            ✅ It is 100% legal and safe to use
            <NuxtLink to="/disclaimer" class="text-xs">(Read the disclaimer)</NuxtLink>
          </p>
          <div class="flex">
            <button
              class="mr-1 rounded-b-none button-sm"
              :class="{ 'active button-success': activeTab === 'changelog' }"
              @click="activeTab = 'changelog'"
            >
              Changelog
            </button>
            <button
              class="rounded-b-none button-sm"
              :class="{ 'active button-success': activeTab === 'upcomingChanges' }"
              @click="activeTab = 'upcomingChanges'"
            >
              Upcoming changes
            </button>
          </div>
          <div class="mb-2">
            <Changelog v-show="activeTab === 'changelog'" />
            <UpcomingChangesList v-show="activeTab === 'upcomingChanges'" />
          </div>
          <div class="flex justify-between mt-6 text-xs leading-5 text-theme-gray-dark">
            <span class="mb-0 text-xs">
              Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
            </span>
            <div class="flex flex-col text-xs">
              <button class="mb-2 font-bold" @click="isFeedbackScreenOpen = true">
                Give feedback
              </button>
              <DonationButton show-link class="ml-auto" />
            </div>
          </div>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()

const isFeedbackScreenOpen = ref(false)
const activeTab = ref('changelog')

function handleCloseEvent() {
  if (isFeedbackScreenOpen.value) {
    isFeedbackScreenOpen.value = false
  } else {
    emit('close')
  }
}
</script>
