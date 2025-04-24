export const queryKeys = {
  patients: ['patients'],
  patient: (id: string) => ['patient', id],
  dentists: ['dentists'],
  dentist: (id: string) => ['dentist', id],
};
