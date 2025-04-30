import ApiResponse from '@/lib/api-response';
import { connectDB } from '@/lib/connectDB';
import { handleError } from '@/middlewares/handle-error';
import { PatientService } from '@/services/patient.service';
import { NextResponse } from 'next/server';

const getAllPatients = async () => {
  try {
    await connectDB();

    const patients = await PatientService.getAllPatients();
    const apiResponse = new ApiResponse(patients, 'Patients fetched successfully');

    return NextResponse.json(apiResponse, { status: apiResponse.statusCode });
  } catch (error) {
    handleError(error);
  }
};

export const GET = getAllPatients;
