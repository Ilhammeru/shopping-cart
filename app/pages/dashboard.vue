<script lang="ts" setup>
import { useCategory } from '~/composables/useCategory';
import type { MainCategoryListDto } from '~/types/categories';
import type { ProductListDto } from '~/types/products';

const config = useRuntimeConfig();

definePageMeta({
  layout: 'default'
});

useSeoMeta({
    title: 'Shop All Products - Dashboard',
    description: 'Browse our complete collection of products. Find the best deals on electronics, jewelry, and fashion items. Shop now!',
    ogDescription: 'Browse our complete collection of products. Find the best deals on electronics, jewelry, and fashion items.',
    ogTitle: 'Shop All Products - Dashboard',
    ogImage: `${config.public.baseUrl}/ogImage.jpg`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Shop All Products - Dashboard',
    ogUrl: `${config.public.baseUrl}/dashboard`,
    twitterTitle: 'Shop Now',
    robots: 'index, follow',
});

// Optimize page
useHead({
    link: [
      { rel: 'canonical', href: `${config.public.baseUrl}/dashboard` },
      { rel: 'prefetch', href: '/api/product', as: 'fetch' },
    ]
});

// Fetch products data with lazy loading instead of blocking using useFetch
const { data, error, pending } = useLazyFetch<ProductListDto[]>('/api/product', {
    key: 'products-list',
    server: true,
});

const { setProducts } = useProduct();

const { t } = useI18n();

const { getHeaderCategories } = useCategory();

// Watch for data changes and update products
if (data.value) {
  setProducts(data.value || []);
}

watch(
  () => data.value,
  (newData) => {
    console.log('watcher - products data updated:', newData);
  }
)

watch(error, (newError) => {
    if (newError) {
        throw newError;
    }
});

// Categories data - can be loaded immediately since wrapped in ClientOnly
const categories = ref<MainCategoryListDto[]>(getHeaderCategories());

const handleCategorySelect = (slug: string) => {
  console.log('Selected category:', slug);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Wrap in ClientOnly to avoid hydration mismatch -->
    <ClientOnly>
      <CategoryGrid 
        :categories="categories" 
        :title="t('common.whatDoYouWantToBuyToday')"
        @select-category="handleCategorySelect"
      />
      <template #fallback>
        <div class="mb-8">
          <div class="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            <div v-for="i in 16" :key="i" class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </template>
    </ClientOnly>
    
    <LazyProductList />
  </div>
</template>