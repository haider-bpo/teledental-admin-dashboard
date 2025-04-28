import ApiError from '@/lib/api-error';
import ApiResponse from '@/lib/api-response';
import { connectWithDB } from '@/middlewares/connect-with-db';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { parseJson } from '@/middlewares/parse-json';
import { DentistService } from '@/services/dentist.service';
import { RouteHandler } from '@/types/route-handler';
import { isEmptyBody } from '@/utils/validation';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

const updateDentist: RouteHandler = async (req, { params, body }) => {
  const id = params.id;
  const updatedData = body;

  // Validate required fields
  if (!id) {
    throw ApiError.badRequest('Dentist ID is required');
  }

  //validate id
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid Id');
  }

  // Validate body exists and isn't empty
  if (isEmptyBody(body)) {
    throw ApiError.badRequest('Noting Changed');
  }

  const updatedDentist = await DentistService.updateDentist(id, updatedData);

  return NextResponse.json(new ApiResponse(updatedDentist, 'Dentist updated successfully'));
};

export const PATCH = middlewaresHandler(connectWithDB, parseJson)(updateDentist);
