<template>
  <div :class="{ 'dark-mode': isDarkMode === true }" class="h-auto min-h-full">
    <router-view />
    <transition name="fade">
      <AppInstallationPrompt
        v-if="isAppInstallationPromptVisible === true"
        @confirm="handleAppInstallation"
        @cancel="isAppInstallationPromptVisible = false"
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
    // Trigger PWA installation prompt on Chrome mobile
    window.addEventListener("beforeinstallprompt", function(event) {
      this.pwaInstallEvent = event;
      this.isAppInstallationPromptVisible = true;
    });
  },
  computed: {
    ...mapState("darkMode", ["isDarkMode"]),
  },
  methods: {
    ...mapActions("darkMode", ["setDarkMode"]),
    handleAppInstallation() {
      if (this.pwaInstallEvent != null) {
        this.pwaInstallEvent.prompt();
        this.pwaInstallEvent.userChoice.then(() => {
          this.isAppInstallationPromptVisible = false;
        });
      } else {
        this.isAppInstallationPromptVisible = false;
      }
    },
  },
};
</script>

<style lang="sass">
@use "./scss/styles.scss"
</style>
