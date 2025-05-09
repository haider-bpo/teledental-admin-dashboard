export interface Appointment {
  _id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  dentistId: string;
  dentistName: string;
  slotId: string;
  slot: string;
  patientLink: string;
  dentistLink: string;
  isApproved: boolean;
  activeChatId: string;
  concern: string;
  swelling: string;
  pain: string;
  hurt: string;
  located: string;
  dateOfLastDentalVisit: string;
  medicalCond: string;
  antibiotic: string;
  allergic: string;
  allergicDesc: string;
  medicalCondBeAware: string;
  currentMedication: string;
  title: string;
  appointmentDate: string;
  fromDentist: boolean;
  timeZone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Type for creating a new appointment
export type CreateAppointmentInput = Omit<Appointment, 'createdAt' | 'updatedAt'>;

// Type for updating an appointment
export type UpdateAppointmentInput = Partial<CreateAppointmentInput>;
