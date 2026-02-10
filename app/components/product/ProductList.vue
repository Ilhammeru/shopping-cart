<script lang="ts" setup>
import type { ProductListDto } from '~/types/products';

const { t } = useI18n();

const { products } = useProduct();

const { addToCart } = useCart();

const addProductToCart = (productId: number) => {
    const selectedProduct: ProductListDto | undefined = products.value.find(p => p.id === productId);

    addToCart(selectedProduct);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        {{ t('common.ourProducts') }}
    </h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        @add-to-cart="addProductToCart"
      />
    </div>
    
    <div v-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        {{ t('common.noProductsFound') }}
      </p>
    </div>
  </div>
</template>
