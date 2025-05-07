'use client';

import { Row } from '@tanstack/react-table';
import { DataTable } from '@/components/table/DataTable';
import { patientsColumns } from './patients-columns';
import { Patient } from '../../types';
import { usePatients } from '../../hooks/use-patients';

export function PatientsTable() {
  const { data: patients, isLoading } = usePatients();

  const handleRowClick = (row: Row<Patient>) => {
    console.log('Patient clicked:', row.original);
    // Navigate to patient details or open modal
  };

  const handleDeleteRows = (rows: Row<Patient>[]) => {
    console.log(
      'Patients to delete:',
      rows.map((row) => row.original),
    );
    // Implement delete logic
  };

  return (
    <DataTable
      data={patients ?? []}
      columns={patientsColumns}
      onRowClick={handleRowClick}
      onDeleteRows={handleDeleteRows}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      isLoading={isLoading}
    />
  );
}
