<template>
  <div class="flex">
    <Modal @close="closeModal">
      <template v-if="isFeedbackScreenOpen === true">
        <template slot="title">Feedback</template>
        <template slot="body">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSda7OlGq68xKkVyx3GsZZntwrGN_CZZJRidgCl5J6R1QIyB2g/viewform?embedded=true"
            width="100%"
            height="520"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            >Loading…</iframe
          >
        </template>
      </template>
      <template v-else>
        <template slot="title">About</template>
        <template slot="body">
          <p>📝 Among Us Detective is digital notebook for Among Us</p>
          <p>🙈 This tool is <b>not</b> a hack</p>
          <p>
            ✅ It is 100% legal and safe to use
            <router-link to="/disclaimer" class="text-xs"
              >(Read the disclaimer)</router-link
            >
          </p>
          <div class="flex">
            <button
              @click="activeTab = 'changelog'"
              class="mr-1 rounded-b-none button-sm"
              :class="{ 'active button-success': activeTab === 'changelog' }"
            >
              Changelog
            </button>
            <button
              @click="activeTab = 'upcomingChanges'"
              class="rounded-b-none button-sm"
              :class="{
                'active button-success': activeTab === 'upcomingChanges',
              }"
            >
              Upcoming changes
            </button>
          </div>
          <div class="mb-2">
            <Changelog v-show="activeTab === 'changelog'" />
            <UpcomingChangesList v-show="activeTab === 'upcomingChanges'" />
          </div>
          <div
            class="flex justify-between mt-6 text-xs leading-5 text-theme-gray-dark"
          >
            <span class="mb-0 text-xs">
              Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
            </span>
            <div class="flex flex-col text-xs">
              <button @click="toggleFeedbackScreen" class="mb-2 font-bold">
                Give feedback
              </button>
              <DonationButton showLink class="ml-auto" />
            </div>
          </div>
        </template>
      </template>
    </Modal>
  </div>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");
const Changelog = () => import("@/components/Changelog.vue");
const UpcomingChangesList = () =>
  import("@/components/UpcomingChangesList.vue");
const DonationButton = () => import("@/components/DonationButton.vue");

export default {
  name: "AboutModal",
  components: {
    Modal,
    Changelog,
    UpcomingChangesList,
    DonationButton,
  },
  data() {
    return {
      isFeedbackScreenOpen: false,
      activeTab: "changelog",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    toggleFeedbackScreen() {
      this.isFeedbackScreenOpen = !this.isFeedbackScreenOpen;
    },
  },
};
</script>
