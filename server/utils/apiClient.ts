import type { H3Event } from 'h3';

/**
 * Global configuration to handle authenticated API calls
 * Bearer token will be load in here
 */
export const authenticatedFetch = async (event: H3Event, endpoint: string, options: any = {}) => {
    const config = useRuntimeConfig();
    
    // Get auth token from cookie
    const token = getCookie(event, 'auth_token');
    
    // Prepare headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make the API call
    const data = await $fetch(`${config.apiBaseUrl}${endpoint}`, {
        ...options,
        headers
    });
    
    return data;
};

/**
 * Makes a public API call without authentication
 */
export const publicFetch = async (endpoint: string, options: any = {}) => {
    const config = useRuntimeConfig();
    
    const data = await $fetch(`${config.apiBaseUrl}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });
    
    return data;
};
