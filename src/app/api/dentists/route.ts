import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import { DentistService } from '@/services/dentist.service';
import { NextResponse } from 'next/server';

const getAllDentists = async () => {
  const patients = await DentistService.getAllDentists();

  return NextResponse.json(new ApiResponse(patients, 'Dentists fetched successfully'));
};
export const GET = apiHandler(getAllDentists);
