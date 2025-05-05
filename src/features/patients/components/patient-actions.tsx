import { Button } from '@/components/ui/button';
import { Mail, MessageCircleMore } from 'lucide-react';
import { Row } from '@tanstack/react-table';
import { Patient } from '../types';

type PatientActionsProps = {
  row: Row<Patient>;
};

export function PatientActions({ row }: PatientActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="ring-brand-primary text-brand-primary cursor-pointer rounded-full ring-1"
      >
        Edit Profile
      </Button>
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
