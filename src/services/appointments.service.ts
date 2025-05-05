import appointmentModel from '@/models/appointment.model';

export class AppointmentService {
  static async getAllAppointments() {
    return await appointmentModel.find({});
  }
}

export default AppointmentService;
