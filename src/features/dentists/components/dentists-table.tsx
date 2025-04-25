'use client';

import { Row } from '@tanstack/react-table';
import { DataTable } from '@/components/table/DataTable';
import { dentistsColumns } from './dentists-columns';
import { Dentist } from '../types';
import { useDentists } from '../hooks/use-dentists';

export function DentistsTable() {
  const { data: dentists, isLoading } = useDentists();

  const handleRowClick = (row: Row<Dentist>) => {
    console.log('Dentist clicked:', row.original);
    // Navigate to dentist details or open modal
  };

  const handleDeleteRows = (rows: Row<Dentist>[]) => {
    console.log(
      'Dentists to delete:',
      rows.map((row) => row.original),
    );
    // Implement delete logic
  };

  return (
    <DataTable
      data={dentists ?? []}
      columns={dentistsColumns}
      onRowClick={handleRowClick}
      onDeleteRows={handleDeleteRows}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      isLoading={isLoading}
    />
  );
}
