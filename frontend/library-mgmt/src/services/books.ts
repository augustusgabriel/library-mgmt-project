import api from "./api";

const BOOKS_URL = `${import.meta.env.VITE_API_RESOURCES_URL}/books/`;

export const getBooks = () => api.get(`${BOOKS_URL}`);
export const getBook = (id: number) => api.get(`${BOOKS_URL}${id}/`);

export const createBook = (data: any) => 
    api.post(`${BOOKS_URL}`, data);

export const updateBook = (id: number, data: any) => 
    api.put(`${BOOKS_URL}${id}/`, data);

export const deleteBook = (id: number) => api.delete(`${BOOKS_URL}${id}/`);