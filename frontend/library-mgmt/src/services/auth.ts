import api from './api'

const LOGOUT_URL = "/api/logout/"

export async function login(username: string, password: string) {
    const response = await api.post(`${import.meta.env.VITE_API_AUTH_URL}/`, {
        username,
        password
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
}

export async function logout(){
    try{
        const refresh = localStorage.getItem('refresh');
        await api.post(`${LOGOUT_URL}`, { refresh_token: refresh });
    } catch (error) {
        console.error("Erro ao deslogar do server.");
    } finally {
        localStorage.clear();
        window.location.href = '/login';
    }
}

export async function refreshToken(){
    const refresh = localStorage.getItem('refresh');
    const response = await api.post(
        `${import.meta.env.VITE_API_AUTH_URL}/refresh/`,
        { refresh }
    );

    localStorage.setItem('access', response.data.access);

    return response.data;
}

export async function getMe() {
    const response = await api.get(`${import.meta.env.VITE_API_RESOURCES_URL}/users/me/`);
    return response.data;
}