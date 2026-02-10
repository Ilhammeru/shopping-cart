<script lang="ts" setup>
interface Props {
  name: string;
  icon: string;
  slug: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'bg-gray-100 dark:bg-gray-700'
});

const emit = defineEmits<{
  click: [slug: string]
}>();

const handleClick = () => {
  emit('click', props.slug);
};
</script>

<template>
  <button
    :class="color"
    class="flex flex-col items-center p-4 rounded-lg transition-all hover:shadow-lg hover:scale-105 group"
    @click="handleClick"
  >
    <div class="w-20 h-20 mb-3 flex items-center justify-center rounded-lg bg-white dark:bg-gray-600 group-hover:bg-blue-50 dark:group-hover:bg-gray-500 transition-colors">
      <Icon :name="icon" class="w-12 h-12 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
    </div>
    <span class="text-xs font-medium text-center text-gray-900 dark:text-gray-100 leading-tight line-clamp-2">
      {{ name }}
    </span>
  </button>
</template>
