import axios from 'axios';
import type { SearchParams, ApiResponse } from '../types/api';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
});

export const getPersons = async (params: SearchParams): Promise<ApiResponse> => {
  const response = await api.get('/pessoas/aberto/filtro', { params });
  return response.data;
};

export const getPersonById = async (id: number) => {
  const response = await api.get(`/pessoas/${id}`);
  return response.data;
};

export const submitInformation = async (personId: number, data: FormData) => {
  const response = await api.post(`/pessoas/${personId}/informacoes`, data);
  return response.data;
};