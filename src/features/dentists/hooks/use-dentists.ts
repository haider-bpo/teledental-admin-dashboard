import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-keys';
import { getDentists } from '../api/get-dentists';

export const useDentists = () => {
  return useQuery({
    queryKey: queryKeys.dentists,
    queryFn: getDentists,
  });
};
