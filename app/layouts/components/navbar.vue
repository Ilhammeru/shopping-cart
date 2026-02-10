<script lang="ts" setup>
import type { LanguageListDto } from '~/types/language-list';
import type { NavbarCategoryDto } from '~/types/navbar-categories';

const { t, locale, setLocale } = useI18n();

const { cartItemsLength } = useCart();

const categories = ref<NavbarCategoryDto[]>([
  { id: 1, name: 'All Products', icon: 'heroicons:squares-2x2', slug: 'all' },
  { id: 2, name: 'Electronics', icon: 'heroicons:computer-desktop', slug: 'electronics' },
  { id: 3, name: 'Accessories', icon: 'heroicons:shopping-bag', slug: 'accessories' },
  { id: 4, name: 'Home & Kitchen', icon: 'heroicons:home', slug: 'home-kitchen' },
  { id: 5, name: 'Sports', icon: 'heroicons:trophy', slug: 'sports' },
  { id: 6, name: 'Fashion', icon: 'heroicons:sparkles', slug: 'fashion' },
]);

const activeCategory = ref('all');

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
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div class="container mx-auto px-4">
            <!-- Top Bar -->
            <div class="flex items-center justify-between py-4">
                <!-- Logo/Brand -->
                <div class="flex items-center space-x-3">
                    <NuxtLink to="/dashboard" class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Icon name="heroicons:sparkles" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 class="font-bold text-xl text-gray-900 dark:text-white">CarCart</h1>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
                    </div>
                    </NuxtLink>
                </div>

                <!-- Search Bar (Optional) -->
                <div class="hidden md:flex flex-1 max-w-xl mx-8">
                    <div class="relative w-full">
                    <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        :placeholder="t('common.searchProducts')"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    </div>
                </div>

            <!-- Right Side Actions -->
                <div class="flex items-center gap-2">
                    <!-- Language Toggle -->
                    <div class="relative group">
                        <button
                            class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                            <span class="text-lg">{{ languages.find(l => l.code === locale)?.flag || '🌐' }}</span>
                            <Icon name="heroicons:chevron-down" class="w-4 h-4 hidden sm:block" />
                        </button>
                    
                        <!-- Language Dropdown -->
                        <div class="absolute right-0 top-full pt-2 z-50 hidden group-hover:block">
                            <div class="w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                            <div v-for="lang in languages" :key="lang.code">
                                <button
                                class="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                                :class="{ 'bg-blue-50 dark:bg-gray-700': locale === lang.code }"
                                @click="switchLanguage(lang.code)"
                                >
                                <span class="text-lg">{{ lang.flag }}</span>
                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ lang.name }}</span>
                                <Icon v-if="locale === lang.code" name="heroicons:check" class="w-4 h-4 ml-auto text-blue-600" />
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <!-- Theme Toggle -->
                    <button
                        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
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

                    <!-- Cart Icon -->
                    <NuxtLink 
                        to="/cart" 
                        class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                        <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
                        <span 
                            v-if="cartItemsLength > 0"
                            class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                        >
                            {{ cartItemsLength }}
                        </span>
                    </NuxtLink>

                    <!-- User Menu -->
                    <div class="relative group">
                        <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div class="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                            U
                            </div>
                        </button>
                    
                        <!-- User Dropdown -->
                        <div class="absolute right-0 top-full pt-2 z-50 hidden group-hover:block">
                            <div class="w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                                <button class="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" />
                                    {{ t('common.logout') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Categories Navigation -->
            <nav class="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                <button
                    v-for="category in categories"
                    :key="category.id"
                    class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
                    :class="activeCategory === category.slug 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'"
                    @click="activeCategory = category.slug"
                >
                    <Icon :name="category.icon" class="w-4 h-4" />
                    {{ category.name }}
                </button>
            </nav>
        </div>
    </header>
</template>