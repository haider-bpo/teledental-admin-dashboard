import api from '@/lib/axios';
import { Patient } from '../types';
import ApiResponse from '@/lib/api-response';

interface UpdatePatientParams {
  id: string;
  updatedData: Partial<Patient>;
}

export const updatePatient = async ({
  id,
  updatedData,
}: UpdatePatientParams): Promise<ApiResponse> => {
  const { data } = await api.patch<ApiResponse>(`/patients/${id}`, updatedData);
  return data;
};
