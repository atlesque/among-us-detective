<template>
  <section class="max-w-2xl p-8 mx-auto">
    <h1 class="p-2 mb-4 font-bold rounded bg-theme-red-light text-theme-red-dark">
      {{ t('notFound.heading') }}
    </h1>
    <p>
      {{ t('notFound.contactPrompt') }}
      <a href="mailto:alexander@atlesque.com">{{ t('notFound.contactLink') }}</a>
    </p>
    <NuxtLink to="/" class="block mb-8">&lt; {{ t('notFound.backHome') }}</NuxtLink>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead(() => ({
  title: t('notFound.heading'),
  meta: [
    {
      name: 'description',
      content: t('notFound.metaDescription'),
    }
  ]
}))
</script>
