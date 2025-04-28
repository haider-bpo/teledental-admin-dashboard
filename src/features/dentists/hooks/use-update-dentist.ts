import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDentist } from '../api/update-dentist';
import { Dentist } from '../types';

export function useUpdateDentist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDentist,
    onMutate: async (newDentist) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['dentists'] });

      // Snapshot the previous value
      const previousDentists = queryClient.getQueryData(['dentists']);

      // Optimistically update to the new value
      queryClient.setQueryData(['dentists'], (old: Dentist[] | undefined) => {
        if (!old) return old;
        return old.map((dentist) =>
          dentist._id === newDentist.id ? { ...dentist, ...newDentist.updatedData } : dentist,
        );
      });

      // Return a context object with the snapshotted value
      return { previousDentists };
    },
    onError: (err, newDentist, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousDentists) {
        queryClient.setQueryData(['dentists'], context.previousDentists);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure our optimistic update is correct
      queryClient.invalidateQueries({ queryKey: ['dentists'] });
    },
  });
}
