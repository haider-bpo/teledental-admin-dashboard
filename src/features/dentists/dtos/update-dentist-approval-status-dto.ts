import { z } from 'zod';

export const UpdateDentistApprovalStatusDTO = z.object({
  dentistId: z.string().min(1, 'dentist Id is required').trim(),
  updatedStatus: z.boolean(),
});
