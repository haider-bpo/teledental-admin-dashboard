import ApiResponse from '@/lib/api-response';
import { apiHandler } from '@/middlewares/api-handler';
import AppointmentService from '@/services/appointments.service';
import { NextResponse } from 'next/server';

const getAllAppointments = async () => {
  const appointments = await AppointmentService.getAllAppointments();
  const apiResponse = new ApiResponse(appointments, 'Appointments fetched successfully');

  return NextResponse.json(apiResponse, { status: apiResponse.statusCode });
};

export const GET = apiHandler(getAllAppointments);
