<script lang="ts" setup>
import type { ProductListDto } from '~/types/products';

const { t } = useI18n();
const { setSelectedProduct } = useProduct();
const { addToCart } = useCart();
const router = useRouter();

const props = defineProps<ProductListDto>();

const viewDetails = () => {
  // Store the full product in state
  setSelectedProduct(props as ProductListDto);
  // Navigate to detail page
  router.push(`/product/${props.id}`);
};

const handleAddToCart = (event: Event) => {
  event.stopPropagation();
  addToCart(props as ProductListDto, 1);
  // Optional: Show a toast notification
  console.log(`Added ${props.title} to cart`);
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full cursor-pointer" @click="viewDetails">
    <div class="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
      <NuxtImg 
        :src="image" 
        :alt="`${title} - ${category}`" 
        class="w-full h-full object-cover"
        loading="lazy"
        width="400"
        height="300"
        format="webp"
        quality="80"
        />
    </div>
    
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex items-start justify-between mb-2">
        <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          {{ category }}
        </span>
      </div>
      
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
        {{ title }}
      </h3>
      
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
            {{ short_description }}
      </p>
      
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <span class="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${{ price.toFixed(2) }}
        </span>
        <button 
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-medium"
            @click="handleAddToCart"
        >
            {{ t('common.addToCart') }}
        </button>
      </div>
    </div>
  </div>
</template>
