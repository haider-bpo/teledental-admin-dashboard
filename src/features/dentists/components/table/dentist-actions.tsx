import { Button } from '@/components/ui/button';
import { Mail, MessageCircleMore } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { Dentist } from '../../types';
import Modal from '@/components/layout/modal';
import DentistEditForm, { DentistFormValues } from '../form/dentist-edit-form';
import { useState } from 'react';
import { useUpdateDentist } from '../../hooks/use-update-dentist';
import { toast } from 'sonner';

type DentistActionsProps = {
  row: Row<Dentist>;
};

export function DentistActions({ row }: DentistActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: updateDentist, isPending } = useUpdateDentist();
  const handleEdit = async (data: DentistFormValues) => {
    try {
      await updateDentist({
        id: row.original._id,
        updatedData: data,
      });

      toast.success('Dentist updated successfully');
    } catch (error) {
      console.error('Error updating dentist:', error);
      toast.error('Error updating dentist');
    }
  };
  return (
    <div className="flex items-center gap-2">
      {/* Edit Dentist Profile */}
      <Modal
        title="Edit Dentist Profile"
        child={
          <DentistEditForm dentist={row.original} onSubmit={handleEdit} isLoading={isPending} />
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
      {row.original.email && (
        <button
          className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
          title="Email"
        >
          <Mail />
        </button>
      )}
      {row.original.contactNumber && (
        <button
          className="bg-brand-primary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white"
          title="Chat"
        >
          <MessageCircleMore />
        </button>
      )}
    </div>
  );
}
