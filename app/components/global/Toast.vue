<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import { useColorMode } from '#imports';

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
  <ClientOnly>
    <Toaster
      :theme="isDark ? 'dark' : 'light'"
      position="top-right"
      :rich-colors="true"
      :close-button="true"
      :duration="4000"
    />
  </ClientOnly>
</template>
