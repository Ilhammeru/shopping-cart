<!-- layouts/auth.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Ensure color mode is initialized
const colorMode = useColorMode();
</script>