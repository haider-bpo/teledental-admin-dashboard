import ApiResponse from '@/lib/api-response';
import { connectWithDB } from '@/middlewares/connect-with-db';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { DentistService } from '@/services/dentist.service';
import { RouteHandler } from '@/types/route-handler';
import { NextResponse } from 'next/server';

const getAllDentists: RouteHandler = async () => {
  const patients = await DentistService.getAllDentists();

  return NextResponse.json(new ApiResponse(patients, 'Dentists fetched successfully'));
};

export const GET = middlewaresHandler(connectWithDB)(getAllDentists);
