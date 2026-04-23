import api from './api'

const LOGOUT_URL = "/api/logout/"

export async function login(username: string, password: string) {
    const response = await api.post(`${import.meta.env.VITE_API_AUTH_URL}`, {
        username,
        password
    });

    return response.data;
}

export async function logout(){
    await api.post(`${LOGOUT_URL}`);

    window.location.href = '/login';
}

export async function refreshToken(){
    const response = await api.post(`${import.meta.env.VITE_API_AUTH_URL}/refresh`);
    return response.data;
}

export async function getMe() {
    const response = await api.get(`${import.meta.env.VITE_API_RESOURCES_URL}/users/me`);
    return response.data;
}