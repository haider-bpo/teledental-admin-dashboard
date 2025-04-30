import api from '@/lib/axios';
import { Dentist } from '../types';

interface UpdateDentistParams {
  id: string;
  updatedData: Partial<Dentist>;
}
interface ApiResponse {
  success: boolean;
  message: string;
  data: Dentist;
}

export const updateDentist = async ({
  id,
  updatedData,
}: UpdateDentistParams): Promise<ApiResponse> => {
  const { data } = await api.patch<ApiResponse>(`/dentists`, { id, updatedData });
  // const { data } = await api.patch<ApiResponse>(`/dentists/${id}`, updatedData);
  return data;
};
