<template>
  <div :class="{ 'dark-mode': isDarkMode === true }" class="h-auto min-h-full">
    <router-view />
    <transition name="fade">
      <AppInstallationPrompt
        v-if="isAppInstallationPromptVisible === true"
        @confirm="handleAppInstallationConfirmed"
        @cancel="handleAppInstallationDismissed"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

const AppInstallationPrompt = () =>
  import("@/components/AppInstallationPrompt.vue");

export default {
  name: "App",
  components: {
    AppInstallationPrompt,
  },
  data() {
    return {
      isAppInstallationPromptVisible: false,
    };
  },
  mounted() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
    ) {
      this.setDarkMode(true);
    }
    const hasDismissedAppInstallation = JSON.parse(
      localStorage.getItem("appInstallationDismissed")
    );
    if (
      hasDismissedAppInstallation == null ||
      hasDismissedAppInstallation === false
    ) {
      // Trigger PWA installation prompt on Chrome mobile
      window.addEventListener(
        "beforeinstallprompt",
        this.handleBeforeAppInstallPrompt
      );
      window.addEventListener("appinstalled", () => {
        this.isAppInstallationPromptVisible = false;
      });
    }
  },
  computed: {
    ...mapState("darkMode", ["isDarkMode"]),
  },
  methods: {
    ...mapActions("darkMode", ["setDarkMode"]),
    handleBeforeAppInstallPrompt(event) {
      this.pwaInstallEvent = event;
      this.pwaInstallEvent.userChoice.then(() => {
        this.isAppInstallationPromptVisible = false;
        window.removeEventListener(
          "beforeinstallprompt",
          this.handleBeforeAppInstallPrompt
        );
      });
      this.isAppInstallationPromptVisible = true;
    },
    handleAppInstallationConfirmed() {
      if (this.pwaInstallEvent != null) {
        this.pwaInstallEvent.prompt();
      } else {
        this.isAppInstallationPromptVisible = false;
      }
    },
    handleAppInstallationDismissed() {
      this.isAppInstallationPromptVisible = false;
      localStorage.setItem("appInstallationDismissed", true);
    },
  },
};
</script>

<style lang="sass">
@use "./scss/styles.scss"
</style>
