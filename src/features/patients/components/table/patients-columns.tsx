import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Patient } from '../../types';
import { Appointment } from '@/features/appointments/types';
import PatientActions from './patient-actions';

export const patientsColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Patient Name',
    cell: ({ row }) => (
      <div className="font-medium">{`${row.original.firstName} ${row.original.lastName}`}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.email}</span>
        <span>{row.original.contactNumber}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => row.original.location?.state || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'activeAppointments',
    header: 'Active Appointments',
    cell: ({ row }) => {
      // Use a component to use the hook
      const AppointmentCount = () => {
        const queryClient = useQueryClient();
        const appointments = queryClient.getQueryData<Appointment[]>(['appointments']) || [];
        const patientAppointments = appointments.filter(
          (appointment) => appointment.patientId === row.original._id && appointment.isApproved,
        );
        return <span>{patientAppointments.length}</span>;
      };
      return <AppointmentCount />;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      // Green check if verified, red X if not
      if (row.original.isVerified) {
        return <Check className="text-2xl text-green-500" />;
      } else {
        return <X className="text-2xl text-red-500" />;
      }
    },
    enableSorting: false,
  },
  {
    accessorKey: 'approval',
    header: 'Approval',
    cell: ({ row }) => {
      if (row.original.isVerified) {
        return <Badge className="w-25 bg-green-500 px-4 py-[.3rem] font-semibold">Approved</Badge>;
      } else {
        return <Badge className="w-25 bg-red-500 px-4 py-[.3rem] font-semibold">Rejected</Badge>;
      }
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <PatientActions row={row} />,
    enableSorting: false,
  },
];
