import { authenticatedFetch } from "../utils/apiClient";

export default defineEventHandler(async (event) => {
    // Call real url of fakestoreapi
    const data = await authenticatedFetch(event, `/products`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return data;
});