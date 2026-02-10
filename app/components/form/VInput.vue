<!-- components/form/VInput.vue -->
<template>
  <div class="mb-4">
    <label v-if="label" :for="name" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <slot name="prefix" />
      
      <VeeField
        :id="name"
        v-slot="{ field, errorMessage }"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
      >
        <input
          v-bind="field"
          :type="type"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="[
            'w-full py-3 border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors dark:bg-gray-800 dark:text-gray-200',
            errorMessage ? 'border-red-300 focus:ring-red-200' : 'border-gray-300',
            icon ? 'pl-10 pr-4' : 'px-4',
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          ]"
          >
      </VeeField>
      
      <slot name="suffix" />
    </div>
    
    <VeeErrorMessage :name="name" class="mt-1 text-sm text-red-600" />
    <p v-if="description" class="mt-1 text-sm text-gray-500">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  description: '',
  icon: '',
  required: false,
  disabled: false,
});
</script>