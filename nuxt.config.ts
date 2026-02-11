// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr:false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
      nodeEnv: process.env.NUXT_NODE_ENV,
    },
    apiBaseUrl: process.env.NUXT_API_BASE_URL,
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/device",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@dargmuesli/nuxt-cookie-control",
    '@vee-validate/nuxt',
    '@vueuse/nuxt'
  ],
  build: {
    transpile: ['@heroicons/vue']
  },
  veeValidate: {
    // Enable auto imports
    autoImports: true,
    // Use different component names (optional)
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  nitro: {
    compressPublicAssets: true,
    logLevel: 4,
    // Global API route rules for proxy optimization
    routeRules: {
      '/api/**': { 
        cors: true,
        headers: {
          'cache-control': 's-maxage=0, must-revalidate'
        }
      }
    }
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    dirs: ["app/stores"],
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ],
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#3b82f6' }
      ]
    },
  },

  // Enable route rules for prerendering and caching
  routeRules: {
    '/': { prerender: true },
    '/dashboard': { swr: 3600 }, 
    '/api/product': { swr: 60 },  // shorter cache lifetime
    '/api/product/**': { swr: 60 }, 
  },

  experimental: {
    payloadExtraction: true,
    inlineSSRStyles: true,  // Inline critical CSS for faster FCP/LCP
    renderJsonPayloads: true,
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "color-mode",
    storage: "localStorage",
    disableTransition: false,
  },

  image: {
    provider: "ipx",
    quality: 80,
    format: ["webp", "png", "jpeg"],
  },

  googleFonts: {
    families: {
      Inter: [400, 600, 700],  // Only load needed weights
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    download: true,  // Self-host fonts for faster loading
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000",
    defaultLocale: "en-US",
    langDir: "./locales",
    strategy: "no_prefix",
    locales: [
      { code: "en-US", language: "en", iso: "en-US", file: "en-US.json" },
      { code: "id", language: "id", iso: "id", file: "id.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "nuxt-lang",
      redirectOn: "root",
    },
  },

  cookieControl: {
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365, // one year
    isAcceptNecessaryButtonEnabled: true,
    isModalForced: false,
    isCookieIdVisible: true,
    closeModalOnClickOutside: true,
    // show cookie button
    isControlButtonEnabled: true,
    // disable to get unstyled css for tailwind
    isCssEnabled: false,
    isDashInDescriptionEnabled: false,
    cookies: {
      necessary: [
        {
          name: {
            fr: "Nécessaire",
            en: "Necessary",
            ar: "ضروري",
          },
          description: {
            fr: "Nécessaire",
            en: "Necessary",
            ar: "ضروري",
          },
          isPreselected: true,
          id: "necessary",
        },
      ],
      optional: [],
    },
    locales: ["en", "id"],
  },
});
