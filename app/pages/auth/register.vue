<!-- pages/auth/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative">
    <!-- Header with Theme/Language Toggle - Fixed to top right -->
    <div class="fixed top-4 right-4 flex gap-2 z-50">
      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Icon v-if="isDark" name="heroicons:sun" class="w-5 h-5" />
        <Icon v-else name="heroicons:moon" class="w-5 h-5" />
      </button>

      <!-- Language Selector -->
      <div class="relative group">
        <button
          class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <span class="text-lg">{{ currentLanguage?.flag || '🇺🇸' }}</span>
        </button>
        <div class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 hidden group-hover:block">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            class="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :class="{ 'bg-blue-50 dark:bg-gray-700': currentLanguage?.code === lang.code }"
          >
            <span class="text-lg">{{ lang.flag }}</span>
            <span class="text-gray-700 dark:text-gray-300 text-sm">{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-md">
      <!-- Logo/Brand Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4">
          <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t("auth.createYourNewAccount") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          {{ $t("auth.createYourNewAccountDescription") }}
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors">

        <!-- Form -->
        <form @submit="handleRegister" class="space-y-5">
          <!-- Username -->
          <FormVInput
            name="username"
            :label="$t('common.username')"
            type="text"
            placeholder="doe"
            required
            icon="user"
          >
            <template #prefix>
              <Icon name="heroicons:user" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </template>
          </FormVInput>

          <!-- Email -->
          <FormVInput
            name="email"
            :label="$t('common.email')"
            type="email"
            placeholder="owner@laundry.com"
            required
            icon="envelope"
          >
            <template #prefix>
              <Icon name="heroicons:envelope" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </template>
          </FormVInput>

          <!-- Password -->
          <FormVInput
            name="password"
            :label="$t('common.password')"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            required
            icon="lock-closed"
          >
            <template #prefix>
              <Icon name="heroicons:lock-closed" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </template>

            <template #suffix>
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
              </button>
            </template>
          </FormVInput>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-primary text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            {{ $t("common.register") }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
          {{ $t("auth.alreadyHaveAnAccount") }}
          <NuxtLink to="/auth/login" class="text-primary-blue font-semibold hover:underline ml-1">
            {{ $t("common.login") }}
          </NuxtLink>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { LanguageListDto } from '~/types/language-list';
import type { RegisterPayloadDto } from '~/types/register-payload';
import { registerSchema } from '~/utils/validations/auth';

definePageMeta({
  layout: 'auth',
});

const { handleApiError } = useErrorHandler();

const showPassword = ref(false);
const isLoading = ref(false)

// Use VeeValidate's useForm composable
const { handleSubmit } = useForm({
  validationSchema: registerSchema,
});

// Dark Mode
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

// Language Selection with i18n
const { locale, setLocale } = useI18n();

const languages: LanguageListDto[] = [
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];

const currentLanguage = computed(() => {
  return languages.find(l => l.code === locale.value) || languages[0];
});

const switchLanguage = async (langCode: 'en-US' | 'id') => {
  await setLocale(langCode);
};

// Create submit handler using handleSubmit
const handleRegister = handleSubmit(async (values) => {
  isLoading.value = true;
  
  try {
    const payload = values as unknown as RegisterPayloadDto;

    await (payload);
    
    toast.success('Login successful!', 'Redirecting to dashboard...');
    
    // TODO: Navigate to dashboard based on user role
    // await navigateTo('/dashboard');
    
  } catch (error: any) {
    handleApiError(error, 'Login Failed');
  } finally {
    isLoading.value = false;
  }
});
</script>