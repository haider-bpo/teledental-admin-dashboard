import { successResponse } from '@/lib/responses';
import { withDB } from '@/middlewares/db';
import { errorHandler } from '@/middlewares/error-handler';
import { middlewaresHandler } from '@/middlewares/middlewares-handler';
import { DentistService } from '@/services/dentist.service';
import { RouteHandler } from '@/types/route-handler';

const updateDentist: RouteHandler = async (req, { params }) => {
  const body = await req.json();
  const id = params.id;
  const updatedData = body;

  if (!id) {
    throw new Error('Dentist ID is required');
  }

  console.log('Updating dentist with ID:', id, 'with data:', updatedData);
  const updatedDentist = await DentistService.updateDentist(id, updatedData);
  console.log('Update result:', updatedDentist);

  return successResponse(updatedDentist, 'Dentist updated successfully', 200);
};

export const PATCH = middlewaresHandler(errorHandler, withDB)(updateDentist);
