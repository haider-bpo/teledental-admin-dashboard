import { successResponse } from '@/lib/responses';
import { withDB } from '@/middlewares/db';
import { errorHandler } from '@/middlewares/error-handler';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { DentistService } from '@/services/dentist.service';
import { NextRequest } from 'next/server';

const getAllDentists = async (req: NextRequest): Promise<Response> => {
  const patients = await DentistService.getAllDentists();

  return successResponse(patients, 'Dentists fetched successfully', 200);
};

export const GET = middlewaresHandler(errorHandler, withDB)(getAllDentists);
