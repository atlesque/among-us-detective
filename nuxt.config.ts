// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8071,
  },

  compatibilityDate: "2024-11-01",

  // SPA mode — no server-side rendering
  ssr: false,

  app: {
    head: {
      title: "Among Us Detective",
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1.0",
      meta: [
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        {
          name: "description",
          content: "Tool to help track innocents and suspects in Among Us.",
        },
        {
          name: "keywords",
          content: "among us, detective, innocents, suspects, tracker",
        },
        { property: "og:title", content: "Among Us Detective" },
        { property: "og:url", content: "https://amongusdetective.com" },
        {
          property: "og:image",
          content:
            "https://amongusdetective.com/og-image/among-us-detective-logo.jpg",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:description",
          content: "Tool to help track innocents and suspects in Among Us.",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "@sentry/nuxt/module",
    "nuxt-gtag",
  ],

  // Global CSS
  css: ["~/assets/scss/styles.scss"],

  // Google Analytics
  gtag: {
    id: "G-F1ZVM4FLC6",
  },

  // PWA
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Among Us Detective",
      short_name: "AUD",
      theme_color: "#000000",
      background_color: "#000000",
      display: "standalone",
    },
    workbox: {
      skipWaiting: true,
    },
  },

  // Sentry (DSN and runtime options are in sentry.client.config.ts)
  sentry: {
    org: "atlesque-media-vof",
    project: "among-us-detective",
  },

  runtimeConfig: {
    public: {
      appVersion: process.env.APP_VERSION ?? "0.1.21",
      sentry: {
        dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "pinia-plugin-persistedstate",
        "vuedraggable", // CJS
        "vue3-moveable",
      ],
    },
  },

  sourcemap: {
    client: "hidden",
  },
});