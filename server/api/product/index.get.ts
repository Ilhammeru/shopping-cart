import { authenticatedFetch } from "../../utils/apiClient";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);  // dummy query to be sent

    try {
        const products = await authenticatedFetch(event, '/products', {
            query: {
                limit: query.limit || '50',
            }
        });
    
        return products;
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.message || 'Failed to fetch products'
        })
    }
});