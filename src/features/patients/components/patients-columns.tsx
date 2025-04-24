import { ColumnDef } from '@tanstack/react-table';
import { HighlightMatch } from '@/components/table/HighlightMatch';
import { Badge } from '@/components/ui/badge';
import { Patient } from '../types';

export const patientsColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="font-medium">{`${row.original.firstName} ${row.original.lastName}`}</div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row, table }) => {
      const value = row.original.email;
      const globalFilter = table.getState().globalFilter;
      return <HighlightMatch text={value} query={globalFilter || ''} />;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact',
    cell: ({ row }) => row.original.contactNumber || '-',
    enableSorting: true,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const loc = row.original.location;
      return loc.address || '-';
    },
    enableSorting: true,
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified',
    cell: ({ row }) => {
      return row.original.isVerified ? (
        <Badge variant="default">Verified</Badge>
      ) : (
        <Badge variant="secondary">Pending</Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'createdAt',
    header: 'Signed Up',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString();
    },
    enableSorting: true,
  },
];
