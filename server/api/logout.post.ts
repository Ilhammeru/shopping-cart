export default defineEventHandler(async (event) => {
    // Delete the auth cookie
    deleteCookie(event, 'auth_token');

    return {
        success: true,
        message: 'Logged out successfully'
    };
})
