import ApiResponse from '@/lib/api-response';
import { connectWithDB } from '@/middlewares/connect-with-db';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { PatientService } from '@/services/patient.service';
import { RouteHandler } from '@/types/route-handler';
import { NextResponse } from 'next/server';

const getAllPatients: RouteHandler = async () => {
  const patients = await PatientService.getAllPatients();
  const apiResponse = new ApiResponse(patients, 'Patients fetched successfully');

  return NextResponse.json(apiResponse, { status: apiResponse.statusCode });
};

export const GET = middlewaresHandler(connectWithDB)(getAllPatients);
