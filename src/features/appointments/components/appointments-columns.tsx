import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '../types';
import { AppointmentActions } from './appointment-actions';

export const appointmentsColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'appointmentId',
    header: 'Appointment ID',
    cell: ({ row }) => <div className="font-medium">{row.original.appointmentId}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'appointmentDate',
    header: 'Date/Time',
    cell: ({ row }) => (
      <div>
        {new Date(row.original.appointmentDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric', 
          year: 'numeric'
        })}
        <br />
        {new Date(row.original.appointmentDate).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })} - {new Date(new Date(row.original.appointmentDate).getTime() + 15*60000).toLocaleTimeString('en-US', {
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true
        })}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'dentistName',
    header: 'Dentist',
    cell: ({ row }) => (
      <div className="group relative cursor-pointer font-medium">
        {row.original.dentistName}
        <div className="absolute top-full left-0 z-10 hidden min-w-max rounded bg-white p-2 text-xs text-gray-700 shadow group-hover:block">
          <div>Email: {row.original.dentistLink || '-'}</div>
        </div>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'patientName',
    header: 'Patient',
    cell: ({ row }) => (
      <div className="group relative cursor-pointer font-medium">
        {row.original.patientName}
        <div className="absolute top-full left-0 z-10 hidden min-w-max rounded bg-white p-2 text-xs text-gray-700 shadow group-hover:block">
          <div>Email: {row.original.patientEmail || '-'}</div>
        </div>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'located',
    header: 'Location',
    cell: ({ row }) => row.original.located || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'isApproved',
    header: 'Status',
    cell: ({ row }) => {
      // Logic: Scheduled (green) if isApproved, Pending (yellow) if not approved and not canceled, Canceled (red) if fromDentist and not approved
      let status = 'Pending';
      let color = 'bg-yellow-400';
      if (row.original.isApproved) {
        status = 'Scheduled';
        color = 'bg-green-500';
      } else if (row.original.isApproved === false && row.original.fromDentist) {
        status = 'Canceled';
        color = 'bg-red-500';
      }
      return (
        <Badge className={`w-24 px-4 py-[.3rem] font-semibold text-white ${color}`}>{status}</Badge>
      );
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <AppointmentActions row={row} />,
    enableSorting: false,
  },
];
