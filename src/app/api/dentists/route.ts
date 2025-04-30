import ApiResponse from '@/lib/api-response';
import { connectDB } from '@/lib/connectDB';
import { handleError } from '@/middlewares/handle-error';
import { DentistService } from '@/services/dentist.service';
import { NextResponse } from 'next/server';

const getAllDentists = async () => {
  try {
    await connectDB();
    const patients = await DentistService.getAllDentists();

    return NextResponse.json(new ApiResponse(patients, 'Dentists fetched successfully'));
  } catch (error) {
    handleError(error);
  }
};
export const GET = getAllDentists;
