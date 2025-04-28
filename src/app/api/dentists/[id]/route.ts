import ApiResponse from '@/lib/middlewares/api-response';
import router from '@/lib/router';
import { DentistService } from '@/services/dentist.service';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiError from '@/lib/middlewares/api-error';

const getAllDentists = router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const updatedData = req.body;

  if (!id) {
    throw new ApiError('Dentist ID is required', 404);
  }

  const updatedDentist = await DentistService.updateDentist(id, updatedData);
  return res.json(new ApiResponse(updatedDentist, 'Dentist updated successfully'));
});

export default getAllDentists;
