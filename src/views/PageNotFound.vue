<template>
  <section class="max-w-2xl p-8 mx-auto">
    <h1
      class="p-2 mb-4 font-bold rounded bg-theme-red-light text-theme-red-dark"
    >
      Page not found
    </h1>
    <p>
      If you think this page should exist,
      <a href="mailto:alexander@atlesque.com">please let me know.</a>
    </p>
    <router-link to="/" class="block mb-8">&lt; Back home</router-link>
  </section>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
