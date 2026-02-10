<script lang="ts" setup>
import { useCategory } from '~/composables/useCategory';
import type { MainCategoryListDto } from '~/types/categories';

definePageMeta({
  layout: 'default'
});

useHead({
    title: 'Dashboard - Shopping Cart App',
    meta: [
        { name: 'description', content: 'Browse products and manage your shopping cart in the Shopping Cart App dashboard.' },
        { property: 'og:title', content: 'Dashboard - Shopping Cart App' },
        { property: 'og:description', content: 'Browse products and manage your shopping cart in the Shopping Cart App dashboard.' },
    ]
});

const { t } = useI18n();

const { getHeaderCategories } = useCategory();

const { getProducts } = useProduct();

// Categories data
const categories = ref<MainCategoryListDto[]>([]);

const handleCategorySelect = (slug: string) => {
  console.log('Selected category:', slug);
};

const getCategories = () => {
    categories.value = getHeaderCategories();
};

const getProductData = async () => {
    await getProducts();
};

onMounted(() => {
    getCategories();
    getProductData();
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