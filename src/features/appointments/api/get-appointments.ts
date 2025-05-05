import api from '@/lib/axios';
import { Appointment } from '../types';

interface ApiResponse {
  success: boolean;
  message: string;
  data: Appointment[];
}

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await api.get<ApiResponse>('/appointments');
  return data.data;
};
