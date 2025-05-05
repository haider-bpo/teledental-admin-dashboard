import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-keys';
import { getAppointments } from '../api/get-appointments';

export const useAppointments = () => {
  return useQuery({
    queryKey: queryKeys.appointments,
    queryFn: getAppointments,
  });
};
