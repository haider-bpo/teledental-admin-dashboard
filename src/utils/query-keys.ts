export const queryKeys = {
  auth: ['auth'],
  patients: ['patients'],
  patient: (id: string) => ['patient', id],
  dentists: ['dentists'],
  dentist: (id: string) => ['dentist', id],
};
