import ApiError from '@/lib/api-error';
import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import { HandlerFn } from '@/middlewares/api-handler/types';
import { PatientService } from '@/services/patient.service';
import { isEmptyBody } from '@/utils/validation';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

const updatePatient: HandlerFn = async (req, context) => {
  const { id } = context.params;
  const updatedData = context.body;

  // Validate required fields
  if (!id) {
    throw ApiError.badRequest('Patient ID is required');
  }

  //validate id
  if (!isValidObjectId(id)) {
    throw ApiError.badRequest('Invalid Id');
  }

  // Validate body exists and isn't empty
  if (isEmptyBody(updatedData)) {
    throw ApiError.badRequest('Noting Changed');
  }

  const updatedPatient = await PatientService.updatePatient(id, updatedData);
  return NextResponse.json(new ApiResponse(updatedPatient, 'Patient updated successfully'));
};

export const PATCH = apiHandler(updatePatient);
