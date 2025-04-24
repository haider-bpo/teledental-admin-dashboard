import api from '@/lib/axios';
import { Patient } from '../types';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Patient[];
}

export const getPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get<ApiResponse>('/patients');
  return data.data;
};
