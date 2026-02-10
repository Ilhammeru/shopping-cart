<script lang="ts" setup>
const { t } = useI18n();

interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
  color?: string;
}

interface Props {
  categories: Category[];
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Categories'
});

const emit = defineEmits<{
  selectCategory: [slug: string]
}>();

const handleCategoryClick = (slug: string) => {
  emit('selectCategory', slug);
};
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h2>
      <NuxtLink 
        to="#" 
        class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
      >
        {{ t('common.seeAllCategories') }}
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :name="category.name"
        :icon="category.icon"
        :slug="category.slug"
        :color="category.color"
        @click="handleCategoryClick"
      />
    </div>
  </div>
</template>
