'use client';

import { Row } from '@tanstack/react-table';
import { DataTable } from '@/components/table/DataTable';
import { appointmentsColumns } from './appointments-columns';
import { Appointment } from '../types';
import { useAppointments } from '../hooks/use-appointments';

export function AppointmentsTable() {
  const { data: appointments, isLoading } = useAppointments();

  const handleRowClick = (row: Row<Appointment>) => {
    console.log('Appointment clicked:', row.original);
    // Navigate to patient details or open modal
  };

  const handleDeleteRows = (rows: Row<Appointment>[]) => {
    console.log(
      'Appointments to delete:',
      rows.map((row) => row.original),
    );
    // Implement delete logic
  };

  return (
    <DataTable
      data={appointments ?? []}
      columns={appointmentsColumns}
      onRowClick={handleRowClick}
      onDeleteRows={handleDeleteRows}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      isLoading={isLoading}
    />
  );
}
