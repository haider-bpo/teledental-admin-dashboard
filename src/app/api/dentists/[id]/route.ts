import ApiError from '@/lib/api-error';
import ApiResponse from '@/lib/api-response';
import { connectDB } from '@/lib/connectDB';
import { handleError } from '@/middlewares/handle-error';
import { DentistService } from '@/services/dentist.service';
import { isEmptyBody } from '@/utils/validation';
import { isValidObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

const updateDentist = async (req: NextRequest) => {
  try {
    await connectDB();

    const { id, updatedData } = await req.json();

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
  } catch (error: any) {
    handleError(error);
  }
};

export const PATCH = updateDentist;
