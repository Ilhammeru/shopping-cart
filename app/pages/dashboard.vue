<script lang="ts" setup>
import { useCategory } from '~/composables/useCategory';
import type { MainCategoryListDto } from '~/types/categories';
import type { ProductListDto } from '~/types/products';

definePageMeta({
  layout: 'default'
});

useHead({
    title: 'Shop All Products - Dashboard',
    meta: [
        { name: 'description', content: 'Browse our complete collection of products. Find the best deals on electronics, jewelry, and fashion items. Shop now!' },
        { property: 'og:title', content: 'Shop All Products - Dashboard' },
        { property: 'og:description', content: 'Browse our complete collection of products. Find the best deals on electronics, jewelry, and fashion items.' },
        { name: 'robots', content: 'index, follow' },
    ],
    link: [
        { rel: 'canonical', href: `${useRuntimeConfig().public.baseUrl}/dashboard` }
    ]
});

// Fetch products data and auto cache
const { data, error } = await useFetch<ProductListDto[]>('/api/product', {
    key: 'products-list',
});

const { setProducts } = useProduct();

const { t } = useI18n();

const { getHeaderCategories } = useCategory();

if (error.value) {
  throw error.value;
}

// Set product state
if (data.value) {
  setProducts(data.value);
}

// Categories data
const categories = ref<MainCategoryListDto[]>([]);

const handleCategorySelect = (slug: string) => {
  console.log('Selected category:', slug);
};

const getCategories = () => {
    categories.value = getHeaderCategories();
};

onMounted(() => {
    getCategories();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <CategoryGrid 
      :categories="categories" 
      :title="t('common.whatDoYouWantToBuyToday')"
      @select-category="handleCategorySelect"
    />
    
    <ProductList />
  </div>
</template>