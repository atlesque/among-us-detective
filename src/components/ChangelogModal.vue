<template>
  <Modal @close="closeModal">
    <template slot="title">Changelog</template>
    <template slot="body">
      <div
        v-for="(changelogItem, index) in changelog"
        :key="index"
        class="mb-4 text-sm leading-5 text-theme-gray-dark"
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
      <div
        class="flex justify-between mt-6 text-xs leading-5 text-theme-gray-dark"
      >
        <span class="mb-0 text-xs">
          Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
        </span>
        <span class="text-xs">
          <a
            href="mailto:alexander@atlesque.com?subject=Among Us Detective Feedback"
            >Give feedback</a
          >
        </span>
      </div>
    </template>
  </Modal>
</template>

<script>
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "ChangelogModal",
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
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
