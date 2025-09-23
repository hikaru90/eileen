import { getPocketBase } from "~/lib/pocketbase";

export default defineNuxtRouteMiddleware(async (to) => {
    // Skip auth check for login page
    if (to.path === '/login') {
        return;
    }

    const pb = getPocketBase();
    
    // Check if we have stored auth data
    if (process.client) {
        const storedAuth = localStorage.getItem('pocketbase_auth');
        if (storedAuth) {
            try {
                const authData = JSON.parse(storedAuth);
                pb.authStore.save(authData.token, authData.model);
            } catch (e) {
                console.log('Failed to parse stored auth data');
            }
        }
    }

    // If not authenticated, redirect to login
    if (!pb.authStore.isValid) {
        return navigateTo('/login');
    }
});

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2ODA0NjA3MzUsImlkIjoibDhkdHlvZnIwdzl6ZXoxIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.wlHg-UYOR0yfhWlbDJ7WdNDhLgiIrzFKFOxAMh4NT20","model":{"avatar":"","collectionId":"_pb_users_auth_","collectionName":"users","created":"2023-03-19 12:45:27.524Z","email":"alexbueckner@gmail.com","emailVisibility":false,"id":"l8dtyofr0w9zez1","name":"Alex","updated":"2023-03-19 12:45:33.083Z","username":"alex","verified":true,"expand":{}}}
