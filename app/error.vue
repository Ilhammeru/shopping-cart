<script setup lang="ts">
import type { AppError } from '~/types/error';

const props = defineProps({ 
  error: { 
    type: Object as PropType<AppError>, 
    default: null 
  } 
});

const { getUserFriendlyMessage, isDevelopment } = useErrorHandler();

// Get appropriate error message based on environment
const errorMessage = computed(() => {
  if (props.error.statusCode == 404) {
    return null; // Use translation for 404
  }
  return getUserFriendlyMessage(props.error);
});

// Show additional debug info in development
const showDebugInfo = computed(() => isDevelopment.value && props.error);
</script>
<template>
  <div class="min-h-screen p-20 bg-gray-50 dark:bg-slate-900">
    <div
      class="relative flex flex-col justify-center gap-y-4 sm:h-40 sm:gap-y-5 text-center"
    >
      <p class="mb-[-1em] font-semibold text-slate-500 dark:text-slate-300 text-6xl">
        {{ error.statusCode }}
      </p>
      <h1 class="text-2xl font-medium text-slate-900 dark:text-white">
        <template v-if="error.statusCode == 404">
          {{ $t("error.page-not-found") }}
        </template>
        <template v-else>
          {{ errorMessage || error.message }}
        </template>
      </h1>
      
      <!-- Debug information (development only) -->
      <div v-if="showDebugInfo" class="mx-auto mt-4 max-w-2xl text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p class="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
          🔴 Debug Information (Development Only)
        </p>
        <div class="text-xs text-red-700 dark:text-red-300 space-y-1">
          <p><strong>Status:</strong> {{ error.statusCode }}</p>
          <p v-if="error.statusMessage"><strong>Status Message:</strong> {{ error.statusMessage }}</p>
          <p v-if="error.message"><strong>Error Message:</strong> {{ error.message }}</p>
          <details v-if="error.stack" class="mt-2">
            <summary class="cursor-pointer font-semibold">Stack Trace</summary>
            <pre class="mt-2 text-xs overflow-auto bg-red-100 dark:bg-red-950 p-2 rounded">{{ error.stack }}</pre>
          </details>
        </div>
      </div>

      <button
        class="mx-auto mt-6 flex align-middle items-center gap-2 justify-center rounded-lg bg-gradient-primary py-2.5 px-6 text-white hover:cursor-pointer hover:opacity-90 transition-opacity"
        @click="clearError({ redirect: '/' })"
      >
        <Icon name="ph:arrow-left-bold" />
        {{ $t("error.return") }}
      </button>
    </div>
  </div>
</template>
