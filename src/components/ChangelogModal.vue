<template>
  <Modal @close="closeModal">
    <template slot="title">Changelog</template>
    <template slot="body">
      <div
        v-for="(changelogItem, index) in changelogNewestFirst"
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
          >
            {{ changeNotes }}
          </li>
        </ul>
      </div>
      <div class="mt-6 text-xs leading-5 text-theme-gray-dark">
        <p class="mb-0 text-xs">
          Made with ❤ by <a href="https://atlesque.com">Atlesque</a>
        </p>
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
          date: "2020-09-22",
          changes: [
            "Added Dark mode",
            "Show player icons by default. Color names can be enabled in footer",
          ],
        },
        {
          date: "2020-09-30",
          changes: [
            "Make table UI prettier",
            "Move Changelog into separate modal",
            "Improve 'Show map' button layout",
            "Add Notes modal. You can now add notes per round and per game. Props to Greedlord and AshamedBrit on Reddit for the suggestion!",
            "Improve mobile UI",
          ],
        },
        {
          date: "2020-10-05",
          changes: ["Move Notes button to top button row for easier access"],
        },
      ],
    };
  },
  computed: {
    changelogNewestFirst() {
      return [...this.changelog].reverse();
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
