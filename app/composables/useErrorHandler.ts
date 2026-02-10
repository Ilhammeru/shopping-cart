interface ErrorResponse {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  data?: any;
}

export const useErrorHandler = () => {
  const config = useRuntimeConfig();
  const toast = useToast();
  
  // Determine if we're in a development environment
  const isDevelopment = computed(() => {
    const env = config.public.nodeEnv || 'development';
    return ['development', 'staging', 'local'].includes(env.toLowerCase());
  });

  /**
   * Get user-friendly error message based on environment
   */
  const getUserFriendlyMessage = (error: any): string => {
    // If in development, show actual error
    if (isDevelopment.value) {
      return getActualErrorMessage(error);
    }

    // Production: return generic user-friendly messages
    const statusCode = error?.statusCode || error?.response?.status;
    
    switch (statusCode) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Authentication required. Please log in and try again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 408:
        return 'Request timeout. Please try again.';
      case 409:
        return 'There was a conflict with your request. Please try again.';
      case 422:
        return 'The provided data is invalid. Please check and try again.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'An internal server error occurred. Please try again later.';
      case 502:
        return 'Bad gateway. The server is temporarily unavailable.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      case 504:
        return 'Gateway timeout. The server took too long to respond.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  };

  /**
   * Extract actual error message from various error formats
   */
  const getActualErrorMessage = (error: any): string => {
    // Try different error message locations
    if (error?.data?.message) return error.data.message;
    if (error?.message) return error.message;
    if (error?.statusMessage) return error.statusMessage;
    if (error?.response?.data?.message) return error.response.data.message;
    if (typeof error === 'string') return error;
    
    return 'An unexpected error occurred';
  };

  /**
   * Get error title based on status code
   */
  const getErrorTitle = (error: any): string => {
    const statusCode = error?.statusCode || error?.response?.status;
    
    switch (statusCode) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 422:
        return 'Validation Error';
      case 429:
        return 'Too Many Requests';
      case 500:
        return 'Server Error';
      case 502:
      case 503:
      case 504:
        return 'Service Unavailable';
      default:
        return 'Error';
    }
  };

  /**
   * Handle error and show appropriate toast
   */
  const handleError = (error: any, customMessage?: string) => {
    console.error('[Error Handler]', error);
    
    const title = getErrorTitle(error);
    const message = customMessage || getUserFriendlyMessage(error);
    
    toast.error(title, message);

    // Log additional details in development
    if (isDevelopment.value) {
      console.group('🔴 Error Details');
      console.log('Status Code:', error?.statusCode || error?.response?.status);
      console.log('Message:', getActualErrorMessage(error));
      console.log('Full Error:', error);
      console.groupEnd();
    }
  };

  /**
   * Handle API errors specifically
   */
  const handleApiError = (error: any, context?: string) => {
    const contextPrefix = context ? `${context}: ` : '';
    if (isDevelopment.value) {
      console.group(`🔴 API Error${context ? ` - ${context}` : ''}`);
      console.log('Error:', error);
      console.log('Status:', error?.statusCode || error?.response?.status);
      console.log('Message:', getActualErrorMessage(error));
      console.groupEnd();
    }

    const title = context || getErrorTitle(error);
    const message = getUserFriendlyMessage(error);
    
    toast.error(title, message);
  };

  /**
   * Handle validation errors
   */
  const handleValidationError = (errors: Record<string, string[]> | string) => {
    if (typeof errors === 'string') {
      toast.error('Validation Error', errors);
      return;
    }

    // Show first validation error
    const firstError = Object.values(errors)[0]?.[0];
    if (firstError) {
      toast.error('Validation Error', firstError);
    }

    if (isDevelopment.value) {
      console.log('Validation Errors:', errors);
    }
  };

  return {
    handleError,
    handleApiError,
    handleValidationError,
    getUserFriendlyMessage,
    getActualErrorMessage,
    getErrorTitle,
    isDevelopment,
  };
};
