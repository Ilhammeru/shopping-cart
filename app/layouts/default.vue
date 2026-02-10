<!-- layouts/default.vue -->
<script setup lang="ts">
import type { LanguageListDto } from '~/types/language-list';
import navbar from '~/layouts/components/navbar.vue';

const { t, locale, setLocale } = useI18n();
const route = useRoute();

// Check if we're on dashboard pages
const isDashboardPage = computed(() => 
  route.path.startsWith('/dashboard') || 
  route.path.startsWith('/product') || 
  route.path.startsWith('/cart') || 
  route.path.startsWith('/owner') || 
  route.path.startsWith('/employee')
);

// Dark mode state
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

// Language selection
const languages: LanguageListDto[] = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];

const switchLanguage = async (langCode: 'en-US' | 'id') => {
  await setLocale(langCode);
};
</script>

<template>
  <!-- Default Layout (for landing/marketing pages) -->
  <div v-if="!isDashboardPage" class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Navigation -->
    <nav class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="font-bold text-xl text-gray-900 dark:text-white">CarCart</h1>
            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center gap-3">
            <!-- Dark Mode Toggle -->
            <button
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleDarkMode"
            >
              <ClientOnly>
                <Icon v-if="colorMode.value === 'dark'" name="heroicons:sun" class="w-5 h-5" />
                <Icon v-else name="heroicons:moon" class="w-5 h-5" />
                <template #fallback>
                  <Icon name="heroicons:moon" class="w-5 h-5" />
                </template>
              </ClientOnly>
            </button>

            <!-- Language Selector Dropdown -->
            <div class="relative group">
              <button
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <span class="text-lg">{{ languages.find(l => l.code === locale)?.flag || '🌐' }}</span>
                <span class="hidden md:inline text-sm font-medium">
                  {{ languages.find(l => l.code === locale)?.name || 'Language' }}
                </span>
                <Icon name="heroicons:chevron-down" class="w-4 h-4" />
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 top-full pt-2 z-50 hidden group-hover:block">
                <div class="w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  <div v-for="lang in languages" :key="lang.code">
                    <button
                      class="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      :class="{ 'bg-blue-50 dark:bg-gray-700': locale === lang.code }"
                      @click="switchLanguage(lang.code)"
                    >
                      <span class="text-lg">{{ lang.flag }}</span>
                      <span class="text-gray-700 dark:text-gray-300">{{ lang.name }}</span>
                      <Icon v-if="locale === lang.code" name="heroicons:check" class="w-4 h-4 ml-auto text-primary-blue" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <NuxtLink
              to="/auth/login"
              class="px-4 py-2 text-primary-blue font-medium hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <!-- Use i18n -->
              {{ t("common.login") }}
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="px-4 py-2 bg-gradient-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col items-center text-center">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">CarCart</h2>
              <p class="text-gray-600 dark:text-gray-400">Professional Car lending</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 mb-8">
            <NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-blue">Privacy Policy</NuxtLink>
            <NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-blue">Terms of Service</NuxtLink>
            <NuxtLink to="#" class="text-gray-600 dark:text-gray-400 hover:text-primary-blue">Contact</NuxtLink>
          </div>
          
          <p class="text-sm text-gray-500 dark:text-gray-500">
            © {{ new Date().getFullYear() }} CarCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>

  <!-- Dashboard Layout -->
  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Dashboard Header -->
    <navbar />

    <!-- Main Content -->
    <main class="min-h-screen">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Icon name="heroicons:sparkles" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 class="font-bold text-lg text-gray-900 dark:text-white">CarCart</h2>
              <p class="text-xs text-gray-600 dark:text-gray-400">Your Shopping Partner</p>
            </div>
          </div>
          
          <div class="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <NuxtLink to="#" class="hover:text-blue-600 dark:hover:text-blue-400">Help Center</NuxtLink>
            <NuxtLink to="#" class="hover:text-blue-600 dark:hover:text-blue-400">Privacy</NuxtLink>
            <NuxtLink to="#" class="hover:text-blue-600 dark:hover:text-blue-400">Terms</NuxtLink>
          </div>
          
          <p class="text-sm text-gray-500 dark:text-gray-500">
            © {{ new Date().getFullYear() }} CarCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss">
/* Active link styling */
.router-link-exact-active {
  @apply bg-blue-50 dark:bg-gray-800 text-primary-blue font-medium;
}

/* Smooth transitions */
* {
  @apply transition-colors duration-200;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500;
}

/* Hide scrollbar for category navigation */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>