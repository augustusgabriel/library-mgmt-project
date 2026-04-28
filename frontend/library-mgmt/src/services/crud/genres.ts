import api from "../api"

const GENRES_URL = `${import.meta.env.VITE_API_RESOURCES_URL}/genres/`;

export const getGenres = () => api.get(`${GENRES_URL}`);
export const getGenre = (id: number) => api.get(`${GENRES_URL}${id}/`);

export const createGenre = (data: any) => api.post(`${GENRES_URL}`, data);

export const updateGenre = (id: number, data: any) => 
    api.put(`${GENRES_URL}${id}/`, data);

export const deleteGenre = (id: number) => api.delete(`${GENRES_URL}${id}/`);