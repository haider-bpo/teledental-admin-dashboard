import api from '@/lib/axios';
import { Dentist } from '../types';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Dentist[];
}

export const getDentists = async (): Promise<Dentist[]> => {
  const { data } = await api.get<ApiResponse>('/dentists');
  return data.data;
};
