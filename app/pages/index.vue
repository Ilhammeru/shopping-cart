<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: t("site.meta.title"),
  meta: [{ name: "description", content: t("site.meta.description") }],
});
useSeoMeta({
  title: t("site.meta.title"),
  description: t("site.meta.description"),
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
