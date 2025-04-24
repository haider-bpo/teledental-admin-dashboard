import { successResponse } from '@/lib/responses';
import { withDB } from '@/middlewares/db';
import { errorHandler } from '@/middlewares/error-handler';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { PatientService } from '@/services/patient.service';
import { NextRequest } from 'next/server';

const getAllPatients = async (req: NextRequest): Promise<Response> => {
  const patients = await PatientService.getAllPatients();

  return successResponse(patients, 'Patients fetched successfully', 200);
};

export const GET = middlewaresHandler(errorHandler, withDB)(getAllPatients);
