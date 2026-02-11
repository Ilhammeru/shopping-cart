export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const body = await readBody(event);
    
    // Call real url of fakestoreapi
    const data: any = await $fetch(`${config.apiBaseUrl}/auth/login`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If login successful and token exists, set HTTP-only cookie
    if (data.token) {
        setCookie(event, 'auth_token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        // Don't send token to client, only user data
        const { token, ...userDataWithoutToken } = data;
        return userDataWithoutToken;
    }

    return data;
})