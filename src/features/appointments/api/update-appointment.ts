import api from '@/lib/axios';
import { Appointment } from '../types';
import ApiResponse from '@/lib/api-response';

interface UpdateAppointmentParams {
  id: string;
  updatedData: Partial<Appointment>;
}

export const updateAppointment = async ({
  id,
  updatedData,
}: UpdateAppointmentParams): Promise<ApiResponse> => {
  const { data } = await api.patch<ApiResponse>(`/appointments/${id}`, updatedData);
  return data;
};
