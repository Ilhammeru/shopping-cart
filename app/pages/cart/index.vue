<script setup lang="ts">
import type { cartItemDto } from '~/types/cart-item';

definePageMeta({
  layout: 'default'
});

const { t } = useI18n();
const router = useRouter();
const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

const incrementQuantity = (item: cartItemDto) => {
  updateQuantity(item.id, item.quantity + 1);
};

const decrementQuantity = (item: cartItemDto) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1);
  }
};

const removeItem = (productId: number) => {
  if (confirm('Are you sure you want to remove this item from cart?')) {
    removeFromCart(productId);
  }
};

const continueShopping = () => {
  router.push('/dashboard');
};

const proceedToCheckout = () => {
  console.log('Proceeding to checkout...');
};

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear the entire cart?')) {
    clearCart();
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {{ t('common.shoppingCart') }}
      </h1>
      <button
        v-if="cartItems.length > 0"
        class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
        @click="handleClearCart"
      >
            {{ t('common.clearCart') }}
      </button>
    </div>

    <!-- Empty Cart State -->
    <div v-if="cartItems.length === 0" class="text-center py-16">
      <div class="mb-6">
        <Icon name="heroicons:shopping-cart" class="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600" />
      </div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {{ t('common.yourCartIsEmpty') }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
            {{ t('common.startShoppingToAddMoreItems') }}
      </p>
      <button
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        @click="continueShopping"
      >
            {{ t('common.continueShopping') }}
      </button>
    </div>

    <!-- Cart Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6"
        >
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <NuxtLink :to="`/product/${item.id}`">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full sm:w-32 h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                >
              </NuxtLink>
            </div>

            <!-- Product Details -->
            <div class="flex-grow">
              <div class="flex justify-between items-start mb-2">
                <div class="flex-grow">
                  <NuxtLink 
                    :to="`/product/${item.id}`"
                    class="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
                  >
                    {{ item.title }}
                  </NuxtLink>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ item.category }}
                  </p>
                </div>
                <button
                  class="ml-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  title="Remove item"
                  @click="removeItem(item.id)"
                >
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {{ item.description }}
              </p>

              <!-- Price and Quantity -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${{ item.price.toFixed(2) }}
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center gap-4">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      class="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-lg"
                      :disabled="item.quantity <= 1"
                      @click="decrementQuantity(item)"
                    >
                      <Icon name="heroicons:minus" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                    <span class="px-4 py-1.5 font-semibold text-gray-900 dark:text-gray-100 min-w-[50px] text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                      class="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-lg"
                      @click="incrementQuantity(item)"
                    >
                      <Icon name="heroicons:plus" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Item Subtotal -->
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span class="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
          <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Order Summary
          </h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Subtotal ({{ cartItems.length }} items)</span>
              <span>${{ cartTotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Shipping</span>
              <span class="text-green-600 dark:text-green-400">Free</span>
            </div>
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Tax</span>
              <span>${{ (cartTotal * 0.1).toFixed(2) }}</span>
            </div>
          </div>

          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">Total</span>
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${{ (cartTotal * 1.1).toFixed(2) }}
              </span>
            </div>
          </div>

          <button
            class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl mb-3"
            @click="proceedToCheckout"
          >
            {{ t('common.proceedToCheckout') }}
          </button>

          <button
            class="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-gray-100 font-semibold rounded-lg transition-colors"
            @click="continueShopping"
          >
            {{ t('common.continueShopping') }}
          </button>

          <!-- Features -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Secure checkout</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:truck" class="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Free shipping over $100</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Icon name="heroicons:arrow-path" class="w-5 h-5 text-green-600 dark:text-green-400" />
              <span>Easy 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>