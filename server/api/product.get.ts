import { authenticatedFetch } from "../utils/apiClient";

export default cachedEventHandler(async (event) => {
    try {
        // Call real url of fakestoreapi
        const data = await authenticatedFetch(event, `/products`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return data;
    } catch (error: any) {
        console.error('Error fetching products:', error);
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Failed to fetch products'
        });
    }
}, {
    maxAge: 60 * 10, // 10 minutes
    getKey: () => 'products-list',
    swr: true
});