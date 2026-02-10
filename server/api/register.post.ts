export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const body = await readBody(event);
    
    // Call external API
    const data: any = await $fetch(`${config.apiBaseUrl}/users`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return data;
})