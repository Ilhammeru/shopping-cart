<script setup lang="ts">
const { t } = useI18n();
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
definePageMeta({
  layout: "default",
});

const fullText = "Hello, my name is Ilham";
const displayedText = ref("");
const showCursor = ref(true);
const index = ref(0);

const typeWriter = () => {
  if (index.value < fullText.length) {
    displayedText.value += fullText.charAt(index.value);
    index.value++;
    setTimeout(typeWriter, 100);
  } else {
    showCursor.value = false;
  }
};

onMounted(() => {
  typeWriter();
});
</script>
<template>
  <div class="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 
        class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200"
      >
        {{ displayedText }}<span v-if="showCursor" class="cursor-blink">|</span>
      </h1>
    </div>
  </div>
</template>

<style scoped>
@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.cursor-blink {
  animation: blink 0.8s infinite;
}
</style>
