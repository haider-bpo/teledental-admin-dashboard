import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Dentist } from '../../types';
import { Check, Ellipsis, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Appointment } from '@/features/appointments/types';
import { DentistActions } from './dentist-actions';

export const dentistsColumns: ColumnDef<Dentist>[] = [
  {
    accessorKey: 'name',
    header: 'Dentist Name',
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
    accessorKey: 'appointmentsCount',
    header: '# of App.',
    cell: ({ row }) => {
      // Create a component to use the hook properly
      const AppointmentCount = () => {
        const queryClient = useQueryClient();
        const appointments = queryClient.getQueryData<Appointment[]>(['appointments']) || [];

        const dentistAppointments = appointments.filter(
          (appointment) => appointment.dentistId === row.original._id,
        );

        return <span>{dentistAppointments.length || 0}</span>;
      };

      return <AppointmentCount />;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'businessName',
    header: 'Practice Name',
    cell: ({ row }) => row.original.businessName || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'licensedLocations',
    header: 'Licensed Locations',
    cell: ({ row }) => {
      const licenses = row.original.directOnboardingDetails?.licenses || [];
      const states = licenses.map((l) => l.state).filter(Boolean);
      return states.length ? states.join(', ') : '-';
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      // Status icon: Approved (check), Pending (dots), Rejected (cross)
      const approval = row.original.isApproved;
      const verified = row.original.isVerified;
      let icon = null;
      if (approval) {
        icon = <Check className="text-2xl text-green-500" />;
      } else if (!approval && verified === false) {
        icon = <X className="text-2xl text-red-500" />;
      } else {
        icon = <Ellipsis className="text-2xl text-yellow-500" />;
      }
      return <span className="flex justify-center">{icon}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'approval',
    header: 'Approval',
    cell: ({ row }) => {
      const approval = row.original.isApproved;
      const verified = row.original.isVerified;
      if (approval) {
        return <Badge className="w-25 bg-green-500 px-4 py-[.3rem] font-semibold">Approved</Badge>;
      } else if (!approval && verified === false) {
        return <Badge className="w-25 bg-red-500 px-4 py-[.3rem] font-semibold">Rejected</Badge>;
      } else {
        return <Badge className="w-25 bg-yellow-500 px-4 py-[.3rem] font-semibold">Pending</Badge>;
      }
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <DentistActions row={row} />,
    enableSorting: false,
  },
];
