<template>
  <section class="max-w-2xl p-8 mx-auto">
    <NuxtLink to="/" class="block mb-8">&lt; {{ t('donation.back') }}</NuxtLink>
    <h1 class="p-2 mb-4 font-bold rounded bg-theme-blue-light text-theme-blue-dark">
      {{ t('donation.heading') }}
    </h1>
    <p>{{ t('donation.support') }}</p>
    <p>{{ t('donation.about') }}</p>
    <p>{{ t('donation.funding') }}</p>
    <p>
      {{ t('donation.contact') }}
      <a href="mailto:alexander@atlesque.com">alexander@atlesque.com</a>
    </p>
    <p>{{ t('donation.closing') }}</p>
    <p>{{ t('donation.signoff') }}</p>
    <p>-Alex</p>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead(() => ({
  title: t('donation.title'),
}))
</script>
