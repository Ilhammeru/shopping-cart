export default defineNuxtPlugin((nuxtApp) => {
  const { handleError } = useErrorHandler();

  // Global error handler for Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('[Vue Error Handler]', { error, info });
    handleError(error);
  };

  // Handle promise rejections
  if (import.meta.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('[Unhandled Promise Rejection]', event.reason);
      handleError(event.reason);
      event.preventDefault();
    });
  }

  // Provide global error handler
  return {
    provide: {
      handleError,
    },
  };
});
