<template>
  <section
    class="fixed bottom-0 left-0 right-0 flex items-center justify-center p-2 m-2 bg-white border-t md:px-4"
    v-if="isVisible === true"
  >
    <div class="flex flex-wrap items-center justify-around w-full max-w-2xl">
      <span class="text-xs font-regular">
        By using this site, you agree to send anonymous tracking data to help
        with development.
        <button
          class="font-bold text-theme-green btn"
          @click="handleAcceptCookiesClick"
        >
          Dismiss
        </button>
      </span>
    </div>
  </section>
</template>
<script>
export default {
  name: "CookieWarning",
  data() {
    return {
      isVisible: true,
    };
  },
  mounted() {
    const hasAcceptedCookies = JSON.parse(
      localStorage.getItem("acceptedCookies")
    );
    if (hasAcceptedCookies === true) {
      this.isVisible = false;
    }
  },
  methods: {
    handleAcceptCookiesClick() {
      localStorage.setItem("acceptedCookies", true);
      this.isVisible = false;
    },
  },
};
</script>
