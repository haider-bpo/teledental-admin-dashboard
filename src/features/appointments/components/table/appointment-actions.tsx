'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircleMore } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { Appointment } from '../../types';
import { Patient } from '@/features/patients/types';
import { Dentist } from '@/features/dentists/types';
import Modal from '@/components/layout/modal';
import AppointmentEditForm from '../form/appointment-edit-form';
import type { AppointmentFormValues } from '../form/appointment-edit-form';
import { toast } from 'sonner';
import { useUpdateAppointment } from '../../hooks/use-update-appointment';

interface AppointmentActionsProps {
  row: Row<Appointment>;
}

export function AppointmentActions({ row }: AppointmentActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateAppointment, isPending } = useUpdateAppointment();

  const patients = queryClient.getQueryData<Patient[]>(['patients']) || [];
  const dentists = queryClient.getQueryData<Dentist[]>(['dentists']) || [];

  const patient = patients.find((p) => p._id === row.original.patientId);
  const dentist = dentists.find((d) => d._id === row.original.dentistId);

  const hasEmail = patient?.email || dentist?.email;
  const hasContact = patient?.contactNumber || dentist?.contactNumber;

  const handleEdit = async (data: Partial<Appointment> | AppointmentFormValues) => {
    console.log('Appointment data', data);
    try {
      await updateAppointment({
        id: row.original._id,
        updatedData: data,
      });

      toast.success('Appointment updated successfully');
      console.log('Appointment end');
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Error updating appointment');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Modal
        title="Edit Appointment"
        child={
          <AppointmentEditForm
            appointment={row.original}
            onSubmit={handleEdit}
            isLoading={isPending}
          />
        }
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="ring-brand-primary text-brand-primary cursor-pointer rounded-full ring-1"
          >
            Edit Appointment
          </Button>
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      />

      {hasEmail && (
        <div className="group relative">
          <button
            className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
            title="Email"
          >
            <Mail />
          </button>
          <Card className="absolute top-full right-0 z-10 hidden w-48 group-hover:block">
            <CardContent className="px-2">
              {patient?.email && (
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Email Patient
                </button>
              )}
              {dentist?.email && (
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Email Dentist
                </button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {hasContact && (
        <div className="group relative">
          <button
            className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
            title="Chat"
          >
            <MessageCircleMore />
          </button>
          <Card className="absolute top-full right-0 z-10 hidden w-48 group-hover:block">
            <CardContent className="px-2">
              {patient?.contactNumber && (
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Chat with Patient
                </button>
              )}
              {dentist?.contactNumber && (
                <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Chat with Dentist
                </button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
