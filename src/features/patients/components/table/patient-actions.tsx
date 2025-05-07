'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircleMore } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import Modal from '@/components/layout/modal';
import PatientEditForm from '../form/patient-edit-form';
import type { Patient } from '../../types';
import { useUpdatePatient } from '../../hooks/use-update-patient';
import type { PatientFormValues } from '../form/patient-edit-form';
import { toast } from 'sonner';
type PatientActionsProps = {
  row: Row<Patient>;
};

function PatientActions({ row }: PatientActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutateAsync: updatePatient, isPending } = useUpdatePatient();
  const handleEdit = async (data: Partial<Patient> | PatientFormValues) => {
    try {
      await updatePatient({
        id: row.original._id,
        updatedData: data,
      });

      toast.success('Patient updated successfully');
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Error updating patient');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Edit Patient Profile */}
      <Modal
        title="Edit Patient Profile"
        child={
          <PatientEditForm patient={row.original} onSubmit={handleEdit} isLoading={isPending} />
        }
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="ring-brand-primary text-brand-primary cursor-pointer rounded-full ring-1"
          >
            Edit Profile
          </Button>
        }
        open={isOpen}
        onOpenChange={setIsOpen}
      />

      {/* Email */}
      {row.original.email && (
        <button
          className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
          title="Email"
        >
          <Mail />
        </button>
      )}

      {/* Chat */}
      <button
        className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
        title="Chat"
      >
        <MessageCircleMore />
      </button>
    </div>
  );
}

export default PatientActions;
