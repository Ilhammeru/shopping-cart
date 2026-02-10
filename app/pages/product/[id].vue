\<script lang="ts" setup>
import type { cartItemDto } from '~/types/cart-item';
import type { ProductListDto } from '~/types/products';

definePageMeta({
  layout: 'default'
});

useHead({
    title: 'Product Detail - Shopping Cart App',
    meta: [
        { name: 'description', content: 'Browse products and manage your shopping cart in the Shopping Cart App dashboard.' },
        { property: 'og:title', content: 'Product Detail - Shopping Cart App' },
        { property: 'og:description', content: 'Browse products and manage your shopping cart in the Shopping Cart App dashboard.' },
    ]
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { selectedProduct, getProductById } = useProduct();
const { addToCart, cartItems } = useCart();

const productId = computed(() => Number(route.params.id));
const quantity = ref(1);

// Get product from state or fallback to finding by ID
const product = computed<ProductListDto | undefined>(() => {
  if (selectedProduct.value && selectedProduct.value.id === productId.value) {
    return selectedProduct.value;
  }
  return getProductById(productId.value) || undefined;
});

const productPrice = computed<number>(() => {
    return product.value ? product.value.price * quantity.value : 0;
});

const updateProductQuantityInPage = () => {
    const cartItem: cartItemDto | undefined = cartItems.value.find((item: cartItemDto) => item.id === product.value?.id);

    if (cartItem) {
        quantity.value = cartItem.quantity;
    }
}

// If product not found, redirect to dashboard
watchEffect(() => {
  if (!product.value && productId.value) {
    console.warn('Product not found, redirecting to dashboard');
    // Give some time for products to load
    setTimeout(() => {
      if (!product.value) {
        router.push('/dashboard');
      }
    }, 1000);
  } else {
    updateProductQuantityInPage();
  }
});

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addProductToCart = () => {
  console.log(`Adding ${quantity.value} of product ${product.value?.id} to cart`);

  addToCart(product.value, quantity.value);
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="!product" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <div class="loading-spinner w-16 h-16 mx-auto mb-4"/>
        <p class="text-gray-600 dark:text-gray-400">Loading product...</p>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6 text-gray-600 dark:text-gray-400">
        <NuxtLink to="/dashboard" class="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</NuxtLink>
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
        <span class="text-gray-900 dark:text-gray-100">{{ product.title }}</span>
      </nav>

      <!-- Back Button -->
      <button 
        class="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        @click="goBack"
      >
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
        Back to Products
      </button>

      <!-- Product Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
            <img 
              :src="product.image" 
              :alt="product.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Category Badge -->
          <div>
            <span class="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {{ product.category }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            {{ product.title }}
          </h1>

          <!-- Price -->
          <div class="flex items-baseline gap-3">
            <span class="text-4xl font-bold text-blue-600 dark:text-blue-400">
              ${{ product.price.toFixed(2) }}
            </span>
          </div>

          <!-- Description -->
          <div class="prose dark:prose-invert">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- Quantity Selector -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-900 dark:text-gray-100">
              Quantity
            </label>
            <div class="flex items-center gap-4">
              <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button 
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg"
                  :disabled="quantity <= 1"
                  @click="decrementQuantity"
                >
                  <Icon name="heroicons:minus" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <span class="px-6 py-2 font-semibold text-gray-900 dark:text-gray-100 min-w-[60px] text-center">
                  {{ quantity }}
                </span>
                <button 
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg"
                  @click="incrementQuantity"
                >
                  <Icon name="heroicons:plus" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Total: <span class="font-semibold text-gray-900 dark:text-gray-100">${{ productPrice.toFixed(2) }}</span>
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              class="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
              @click="addProductToCart"
            >
              <Icon name="heroicons:shopping-cart" class="w-5 h-5" />
              {{ t('common.addToCart') }}
            </button>
            <button 
              class="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
            >
              <Icon name="heroicons:heart" class="w-5 h-5 inline-block mr-2" />
              Wishlist
            </button>
          </div>

          <!-- Product Features -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Product Features</h3>
            <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Icon name="heroicons:truck" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Icon name="heroicons:arrow-path" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>30-day return policy</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>1-year warranty included</span>
            </div>
            <div class="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <Icon name="heroicons:credit-card" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Secure payment processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
