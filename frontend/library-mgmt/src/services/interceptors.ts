import api from './api';
import type { AxiosRequestConfig } from 'axios';
import { refreshToken, logout } from './auth';

// evita que TS reclame de tipagem
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

export function setupInterceptors(){
    api.interceptors.response.use(
        response => response, // simplesmente retorna a response sem alterar nada
        async error => { // caso API responda com erro
            const originalRequest = error.config as CustomAxiosRequestConfig; // pega request original

            if (originalRequest.url?.includes('/token')) {
                return Promise.reject(error);
            }
            // Se erro foi 401 e é o 1° retry
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // Modifica valor do retry pra evitar loop

                try {
                    await refreshToken(); // tenta renovar token
                    return api(originalRequest); // após renovar, refaz request original
                } catch (refreshError) {
                    logout(); // se não renovou, logout
                    return Promise.reject(refreshError);
                }
            }

            // Propaga erro, ou seja, se refresh falhou ou não foi 401, joga erro pro front
            return Promise.reject(error);
        }
    )
}