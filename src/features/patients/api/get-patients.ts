import api from '@/lib/axios';
import { Patient } from '../types';

export const getPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get<Patient[]>('/patients');
  return data;
};
