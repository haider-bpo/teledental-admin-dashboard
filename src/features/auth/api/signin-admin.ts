import ApiResponse from '@/lib/api-response';
import api from '@/lib/axios';
import { SigninSchemaType } from '../auth.schema';

export const signinAdmin = async (payload: SigninSchemaType): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>('/auth/signin-admin', payload);
  return data;
};
