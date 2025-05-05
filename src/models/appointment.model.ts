import { model, Schema, models } from 'mongoose';

const AppointmentsSchema = new Schema(
  {
    appointmentId: { type: String, trim: true, unique: true },
    patientId: { type: String, trim: true },
    patientName: { type: String, trim: true },
    patientEmail: { type: String, trim: true },
    dentistId: { type: String, trim: true },
    dentistName: { type: String, trim: true },
    slotId: { type: String, trim: true },
    slot: { type: String, trim: true },
    patientLink: { type: String, trim: true },
    dentistLink: { type: String, trim: true },
    isApproved: {
      type: Boolean,
      default: false,
    },
    activeChatId: { type: String, trim: true },
    concern: { type: String, trim: true },
    swelling: { type: String, trim: true },
    pain: { type: String, trim: true },
    hurt: { type: String, trim: true },
    located: { type: String, trim: true },
    dateOfLastDentalVisit: { type: String, trim: true },
    medicalCond: { type: String, trim: true },
    antibiotic: { type: String, trim: true },
    allergic: { type: String, trim: true },
    allergicDesc: { type: String, trim: true },
    medicalCondBeAware: { type: String, trim: true },
    currentMedication: { type: String, trim: true },
    title: { type: String, trim: true },
    appointmentDate: { type: String, trim: true },
    fromDentist: { type: Boolean, default: false },
    timeZone: { type: String, trim: true },
  },
  { timestamps: true },
);

export default models.Appointment || model('Appointment', AppointmentsSchema);
