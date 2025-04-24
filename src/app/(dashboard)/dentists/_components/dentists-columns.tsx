import { ColumnDef } from '@tanstack/react-table';
import { Dentist } from '@/types/dentist';
import { HighlightMatch } from '@/components/table/HighlightMatch';
import { Badge } from '@/components/ui/badge';

export const dentistsColumns: ColumnDef<Dentist>[] = [
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
    accessorKey: 'businessName',
    header: 'Business',
    cell: ({ row }) => row.original.businessName || '-',
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
      return `${loc.city}, ${loc.state}`;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'specialities',
    header: 'Specialties',
    cell: ({ row }) => {
      const specialties = row.original.specialities;
      return (
        <div className="flex flex-wrap gap-1">
          {specialties.slice(0, 2).map((specialty, index) => (
            <Badge key={index} variant="secondary">
              {specialty}
            </Badge>
          ))}
          {specialties.length > 2 && (
            <Badge variant="outline">+{specialties.length - 2} more</Badge>
          )}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === 'active' ? 'default' : status === 'inactive' ? 'secondary' : 'destructive'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'isApproved',
    header: 'Approval',
    cell: ({ row }) => {
      return row.original.isApproved ? (
        <Badge variant="default">Approved</Badge>
      ) : (
        <Badge variant="secondary">Pending</Badge>
      );
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
];
