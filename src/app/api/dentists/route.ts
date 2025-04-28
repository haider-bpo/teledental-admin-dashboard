import ApiResponse from '@/lib/middlewares/api-response';
import router from '@/lib/router';
import { DentistService } from '@/services/dentist.service';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllDentists = router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const dentists = await DentistService.getAllDentists();
  return res.json(new ApiResponse(dentists, 'Dentists fetched successfully'));
});
export default getAllDentists;
