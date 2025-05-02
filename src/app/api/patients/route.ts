import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import { PatientService } from '@/services/patient.service';
import { NextResponse } from 'next/server';

const getAllPatients = async () => {
  const patients = await PatientService.getAllPatients();
  const apiResponse = new ApiResponse(patients, 'Patients fetched successfully');

  return NextResponse.json(apiResponse, { status: apiResponse.statusCode });
};

export const GET = apiHandler(getAllPatients);
