import ApiResponse from '@/lib/middlewares/api-response';
import router from '@/lib/router';
import { PatientService } from '@/services/patient.service';
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const patients = await PatientService.getAllPatients();
  return res.json(new ApiResponse(patients, 'Patients fetched successfully'));
});

// export default getAllPatients;
