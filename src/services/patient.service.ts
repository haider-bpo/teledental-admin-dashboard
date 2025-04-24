import PatientModel from '@/models/patient.model';

export class PatientService {
  static async getAllPatients() {
    return await PatientModel.find({});
  }
}
