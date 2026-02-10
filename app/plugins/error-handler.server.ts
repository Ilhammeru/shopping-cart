export default defineNuxtPlugin((nuxtApp) => {
  // Server-side error handling
  nuxtApp.hook('app:error', (error) => {
    console.error('[Server Error]', error);
  });

  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('[Vue SSR Error]', { error, info });
  });
});
