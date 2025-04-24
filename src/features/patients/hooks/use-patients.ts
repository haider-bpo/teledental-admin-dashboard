import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-keys';
import { getPatients } from '../api/get-patients';

export const usePatients = () => {
  return useQuery({
    queryKey: queryKeys.patients,
    queryFn: getPatients,
  });
};
