import ApiResponse from '@/lib/middlewares/api-response';
import requestHandler from '@/lib/middlewares/request-handler';
import { DentistService } from '@/services/dentist.service';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllDentists = requestHandler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const dentists = await DentistService.getAllDentists();
  return res.json(new ApiResponse(dentists, 'Dentists fetched successfully'));
});

export default getAllDentists;
