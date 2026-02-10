# Toast Notification Usage Guide

The `useToast` composable can be used anywhere in your Nuxt app to show notifications.

## Import and Use

```vue
<script setup>
const toast = useToast();

// Success notification
toast.success('Operation successful!');
toast.success('User created', 'The user has been added to the system.');

// Error notification
toast.error('Something went wrong!');
toast.error('Failed to save', 'Please check your input and try again.');

// Info notification
toast.info('New update available');

// Warning notification
toast.warning('Your session will expire soon');

// Loading notification
const loadingId = toast.loading('Processing...');
// Later dismiss it
toast.dismiss(loadingId);

// Promise-based notification (auto-handles loading/success/error)
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Fetching data...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data'
  }
);
</script>
```

## Available Methods

- `toast.success(message, description?)` - Show success notification
- `toast.error(message, description?)` - Show error notification
- `toast.info(message, description?)` - Show info notification
- `toast.warning(message, description?)` - Show warning notification
- `toast.loading(message)` - Show loading notification (returns ID)
- `toast.dismiss(id?)` - Dismiss a specific notification or all
- `toast.promise(promise, messages)` - Handle promise states automatically

## Examples

### Form Submission
```vue
const handleSubmit = async () => {
  try {
    await $fetch('/api/save', { method: 'POST', body: data });
    toast.success('Saved!', 'Your changes have been saved.');
  } catch (error) {
    toast.error('Error', error.message);
  }
};
```

### Async Operation with Promise
```vue
const deleteItem = async (id) => {
  toast.promise(
    $fetch(`/api/items/${id}`, { method: 'DELETE' }),
    {
      loading: 'Deleting item...',
      success: 'Item deleted successfully',
      error: 'Failed to delete item'
    }
  );
};
```

## Features

✅ Auto-dismisses after 4-5 seconds (configurable)
✅ Theme-aware (follows dark/light mode)
✅ Close button on each toast
✅ Positioned at top-right
✅ Rich colors for better visual distinction
✅ TypeScript support
