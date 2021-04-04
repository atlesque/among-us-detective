<template>
  <div class="flex">
    <Modal @close="closeModal">
      <template slot="title">Settings</template>
      <template slot="body">
        <table class="w-full table-fixed settings-list">
          <tbody>
            <tr>
              <td>Show players as:</td>
              <td>
                <button @click="toggleColorNames" class="button-sm">
                  {{ toggleColorNamesButtonText }}
                </button>
              </td>
            </tr>
            <tr>
              <td>Interface theme:</td>
              <td>
                <button @click="toggleDarkMode" class="button-sm">
                  {{ toggleDarkModeButtonText }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const Modal = () => import("@/components/Modal.vue");

export default {
  name: "SettingsModal",
  components: {
    Modal,
  },
  data() {
    return {
      // TODO
    };
  },
  computed: {
    ...mapState("settings", ["showColorNames"]),
    ...mapState("darkMode", ["isDarkMode"]),
    areColorNamesVisible: {
      get() {
        return this.showColorNames;
      },
      set(value) {
        this.setShowColorNames(value);
      },
    },
    toggleColorNamesButtonText() {
      return this.areColorNamesVisible === true ? "Names" : "Icons";
    },
    toggleDarkModeButtonText() {
      return this.isDarkMode === true ? "Dark" : "Light";
    },
  },
  methods: {
    ...mapActions("settings", ["setShowColorNames"]),
    ...mapActions("darkMode", ["setDarkMode"]),
    closeModal() {
      this.$emit("close");
    },
    toggleColorNames() {
      const newValue = !this.areColorNamesVisible;
      this.areColorNamesVisible = newValue;
      const eventName =
        newValue === true ? "show_color_names" : "hide_color_names";
      this.$gtag.event(eventName, {
        event_category: "global_stats",
      });
    },
    toggleDarkMode() {
      const newValue = !this.isDarkMode;
      this.setDarkMode(newValue);
      const eventName =
        newValue === true ? "dark_mode_enabled" : "light_mode_enabled";
      this.$gtag.event(eventName, {
        event_category: "global_stats",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.settings-list {
  td {
    @apply pr-2;
    @apply py-1;
  }
}
</style>
