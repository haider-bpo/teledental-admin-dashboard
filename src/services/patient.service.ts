import { Patient } from '@/features/patients/types';
import PatientModel from '@/models/patient.model';

export class PatientService {
  static async getAllPatients() {
    return await PatientModel.find({});
  }

  static async updatePatient(id: string, data: Partial<Patient>) {
    return await PatientModel.findByIdAndUpdate(id, data, { new: true });
  }
}
