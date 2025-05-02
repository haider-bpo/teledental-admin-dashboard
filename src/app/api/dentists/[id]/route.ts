import ApiError from '@/lib/api-error';
import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import { HandlerFn } from '@/middlewares/api-handler/types';
import { DentistService } from '@/services/dentist.service';
import { isEmptyBody } from '@/utils/validation';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

const updateDentist: HandlerFn = async (req, context) => {
  const { id } = context.params;
  const updatedData = context.body;

  console.log('id', id);
  console.log('updatedData', updatedData);

  // Validate required fields
  if (!id) {
    throw ApiError.badRequest('Dentist ID is required');
  }

  //validate id
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid Id');
  }

  // Validate body exists and isn't empty
  if (isEmptyBody(updatedData)) {
    throw ApiError.badRequest('Noting Changed');
  }

  const updatedDentist = await DentistService.updateDentist(id, updatedData);
  return NextResponse.json(new ApiResponse(updatedDentist, 'Dentist updated successfully'));
};

export const PATCH = apiHandler(updateDentist);
