import { Dentist } from '@/features/dentists/types';
import DentistModel from '@/models/dentist.model';

export class DentistService {
  static async getAllDentists() {
    return await DentistModel.find({});
  }

  static async updateDentist(dentistId: string, updatedData: Partial<Dentist>) {
    console.log('Updating dentist:', dentistId, 'with data:', updatedData);
    const dentist = await DentistModel.findByIdAndUpdate(dentistId, updatedData, { new: true });
    console.log('Updated dentist:', dentist);
    return dentist;
  }
}
