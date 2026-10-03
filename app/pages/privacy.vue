<template>
  <main class="min-h-screen bg-gray-950 text-gray-100 px-4 py-8 sm:px-6 sm:py-12">
    <div class="mx-auto max-w-3xl">
      <NuxtLink
        to="/"
        class="mb-6 inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-gray-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
        data-test="privacy-back-link"
      >
        <AppIcon name="arrow-left" class="h-4 w-4 shrink-0 text-blue-400" />
        <span>{{ copy.back }}</span>
      </NuxtLink>

      <header class="mb-6 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/80 p-6 shadow-xl sm:p-8">
        <h1 class="text-2xl font-black tracking-tight text-white sm:text-3xl">
          {{ copy.title }}
        </h1>
        <p class="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
          {{ copy.intro }}
        </p>
      </header>

      <div class="space-y-4">
        <section
          v-for="(section, index) in copy.sections"
          :key="section.heading"
          :aria-labelledby="`privacy-section-${index}`"
          class="rounded-xl border border-gray-800 bg-gray-900/70 p-5 shadow-md sm:p-6"
        >
          <h2
            :id="`privacy-section-${index}`"
            class="text-base font-bold text-white sm:text-lg"
          >
            {{ section.heading }}
          </h2>
          <div class="mt-2 space-y-3 text-sm leading-relaxed text-gray-300">
            <p v-for="paragraph in section.paragraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
          <div v-if="section.links?.length" class="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <a
              v-for="link in section.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-8 items-center gap-1 text-sm font-semibold text-blue-400 underline decoration-blue-400/50 underline-offset-4 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>{{ link.label }}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { privacyTranslations } from '~/utils/privacyTranslations'

const { locale } = useI18n()
const copy = computed(() => privacyTranslations[locale.value] ?? privacyTranslations['en-US'])

useHead(() => ({
  title: `${copy.value.title} — Among Us Detective`,
}))
</script>
