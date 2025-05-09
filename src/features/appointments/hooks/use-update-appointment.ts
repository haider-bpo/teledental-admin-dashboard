import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAppointment } from '../api/update-appointment';
import { Appointment } from '../types';

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,
    onMutate: async (newAppointment) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['appointments'] });

      // Snapshot the previous value
      const previousAppointments = queryClient.getQueryData(['appointments']);

      // Optimistically update to the new value
      queryClient.setQueryData(['appointments'], (old: Appointment[] | undefined) => {
        if (!old) return old;
        return old.map((appointment) =>
          appointment.appointmentId === newAppointment.id
            ? { ...appointment, ...newAppointment.updatedData }
            : appointment,
        );
      });

      // Return a context object with the snapshotted value
      return { previousAppointments };
    },
    onError: (err, newAppointment, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousAppointments) {
        queryClient.setQueryData(['appointments'], context.previousAppointments);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure our optimistic update is correct
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
