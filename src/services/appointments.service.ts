import { Appointment } from '@/features/appointments/types';
import appointmentModel from '@/models/appointment.model';

export class AppointmentService {
  static async getAllAppointments() {
    return await appointmentModel.find({});
  }

  static async updateAppointment(id: string, updatedData: Partial<Appointment>) {
    return await appointmentModel.findByIdAndUpdate(id, updatedData, { new: true });
  }
}

export default AppointmentService;
