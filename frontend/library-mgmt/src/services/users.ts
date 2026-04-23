import api from "./api";

const USERS_URL = `${import.meta.env.VITE_API_RESOURCES_URL}/users/`;

export const getUsers = () => api.get(`${USERS_URL}`);
export const getUser = (id: number) => api.get(`${USERS_URL}${id}/`);

export const updateUser = (id: number, data: any) =>
    api.patch(`${USERS_URL}${id}/`, data);

export const deleteUser = (id: number) => api.delete(`${USERS_URL}${id}/`);