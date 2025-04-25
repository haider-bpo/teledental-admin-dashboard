import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDentist } from '../api/update-dentist';

export function useUpdateDentist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDentist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dentists'] });
    },
  });
}
