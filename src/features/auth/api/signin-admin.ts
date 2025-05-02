import ApiResponse from '@/lib/api-response';
import api from '@/lib/axios';

interface SigninAdminPayload {
  email: string;
  password: string;
}

export const signinAdmin = async (payload: SigninAdminPayload): Promise<ApiResponse> => {
  const { data } = await api.post<ApiResponse>('/auth/signin-admin', payload);
  return data.data;
};
