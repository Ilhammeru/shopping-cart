<script setup lang="ts">
import 'vue-sonner/style.css'
const { locale, t } = useI18n();
const colorMode = useColorMode();
const isLoading = ref(true);

if (import.meta.client) {
  const storedLanguage = useCookie("nuxt-lang", { default: () => "" }).value;
  // const storedLanguage = localStorage.getItem("nuxt-lang");
  if (storedLanguage && storedLanguage !== "en-US") {
    locale.value = storedLanguage;
  }
}

onMounted(() => {
  // Remove loading state after initial render
  nextTick(() => {
    isLoading.value = false;
  });
});

useHead({
  htmlAttrs: {
    lang: locale,
    dir: computed(() => {
      return t("locale.dir") as "ltr" | "rtl" | "auto";
    }),
    class: computed(() => colorMode.value === 'dark' ? 'dark' : ''),
  },
  titleTemplate(title) {
    return title ? `${title} - ${t("site.name")}` : `${t("site.name")}`;
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
});

useSeoMeta({
  ogType: 'website',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
  themeColor: '#3b82f6'
});
</script>

<template>
  <div class="relative">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 dark:bg-gray-900"
     />
    <NuxtLayout>
      <div>
        <ClientOnly> <!-- this is to resolve issue about hydration mismatch in the browser console -->
          <CookieBanner />
        </ClientOnly>
        <NuxtPage />
      </div>
    </NuxtLayout>
    <Toast />
  </div>
</template>
