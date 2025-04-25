import ApiResponse from '@/lib/middlewares/api-response';
import requestHandler from '@/lib/middlewares/request-handler';
import { PatientService } from '@/services/patient.service';
import { NextApiRequest, NextApiResponse } from 'next';

const getAllPatients = requestHandler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const patients = await PatientService.getAllPatients();
  return res.json(new ApiResponse(patients, 'Patients fetched successfully'));
});

export default getAllPatients;
