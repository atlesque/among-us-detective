<template>
  <div :class="{ 'dark-mode': isDarkMode === true }" class="h-auto min-h-full">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  mounted() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
    ) {
      this.setDarkMode(true);
    }
  },
  computed: {
    ...mapState("darkMode", ["isDarkMode"]),
  },
  methods: {
    ...mapActions("darkMode", ["setDarkMode"]),
  },
};
</script>

<style lang="sass">
@use "./scss/styles.scss"
</style>
