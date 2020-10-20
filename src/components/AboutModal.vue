<template>
  <div>
    <Modal @close="closeModal">
      <template slot="title">About</template>
      <template slot="body">
        <p>📝 Among Us Detective is digital notebook for Among Us</p>
        <p>🙈 This tool is <b>not</b> a hack</p>
        <p>
          ✅ It is 100% legal and safe to use
          <router-link to="/disclaimer" class="text-xs"
            >(Read the disclaimer here)</router-link
          >
        </p>
        <h2 class="text-base font-bold">Changelog</h2>
        <section class="p-2 overflow-y-scroll bg-gray-100 rounded max-h-64">
          <div
            v-for="(changelogItem, index) in changelog"
            :key="index"
            class="mb-4 text-sm leading-5 text-theme-gray-dark "
          >
            <span class="text-xs font-bold">{{ changelogItem.date }}</span>
            <ul
              class="pl-4 list-disc"
              v-if="(changelogItem.changes || []).length > 0"
            >
              <li
                v-for="(changeNotes, index) in changelogItem.changes"
                :key="index"
                v-html="changeNotes"
              ></li>
            </ul>
          </div>
        </section>
        <div
          class="flex justify-between mt-6 text-xs leading-5 text-theme-gray-dark"
        >
          <span class="mb-0 text-xs">
            Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
          </span>
          <span class="text-xs">
            <button @click="toggleFeedbackScreen">Give feedback</button>
          </span>
        </div>
      </template>
    </Modal>
    <Modal
      @close="toggleFeedbackScreen"
      v-if="isFeedbackScreenOpen === true"
      :isTransparent="true"
    >
      <template slot="title">Feedback</template>
      <template slot="body">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSda7OlGq68xKkVyx3GsZZntwrGN_CZZJRidgCl5J6R1QIyB2g/viewform?embedded=true"
          width="518"
          height="518"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          >Loading…</iframe
        >
      </template>
    </Modal>
  </div>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "AboutModal",
  components: {
    Modal,
  },
  data() {
    return {
      changelog: [
        {
          date: "2020-10-14",
          changes: [
            "Update maps with better versions <small>(Thx Ezzelin!)</small>",
            "Auto-detect dark mode",
            "Make bottom buttons larger and mention them in Help",
          ],
        },
        {
          date: "2020-10-06",
          changes: [
            "Show Help modal for new players <small>(Thx peasant-trip on Reddit!)</small>",
          ],
        },
        {
          date: "2020-10-05",
          changes: [
            "Move Notes button to top button row for easier access",
            "Reduce font-size on large screens",
            "Remake How to use into a GIF slideshow",
          ],
        },
        {
          date: "2020-09-30",
          changes: [
            "Make table UI prettier",
            "Move Changelog into separate modal",
            "Improve 'Show map' button layout",
            "Add Notes modal. You can now add notes per round and per game. <small>(Props to Greedlord and AshamedBrit on Reddit for the suggestion!)</small>",
            "Improve mobile UI",
          ],
        },
        {
          date: "2020-09-22",
          changes: [
            "Added Dark mode",
            "Show player icons by default. Color names can be enabled in footer",
          ],
        },
      ],
      isFeedbackScreenOpen: false,
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
