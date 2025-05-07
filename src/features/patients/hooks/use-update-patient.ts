import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePatient } from '../api/update-patient';
import { Patient } from '../types';

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatient,
    onMutate: async (newPatient) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['patients'] });

      // Snapshot the previous value
      const previousPatients = queryClient.getQueryData(['patients']);

      // Optimistically update to the new value
      queryClient.setQueryData(['patients'], (old: Patient[] | undefined) => {
        if (!old) return old;
        return old.map((patient) =>
          patient._id === newPatient.id ? { ...patient, ...newPatient.updatedData } : patient,
        );
      });

      // Return a context object with the snapshotted value
      return { previousPatients };
    },
    onError: (err, newPatient, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPatients) {
        queryClient.setQueryData(['patients'], context.previousPatients);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure our optimistic update is correct
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}
