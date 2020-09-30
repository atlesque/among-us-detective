<template>
  <Modal @close="closeModal">
    <template slot="title">Changelog</template>
    <template slot="body">
      <div
        v-for="(changelogItem, index) in changelog"
        :key="index"
        class="mb-4 text-sm leading-5 text-theme-gray-dark"
      >
        <span>{{ changelogItem.date }}</span>
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
      <div class="text-xs leading-5 text-theme-gray-dark">
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
