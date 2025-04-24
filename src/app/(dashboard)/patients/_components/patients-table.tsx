'use client';

import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { DataTable } from '@/components/table/DataTable';
import { Patient } from '@/types/patient';
import { patientsColumns } from './patients-columns';

// Dummy data
const dummyPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    contactNumber: '+1 234-567-8901',
    contactName: 'Jane Smith',
    location: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
    },
    gender: 'male',
    status: 'active',
    isVerified: true,
    medicalHistory: ['Hypertension', 'Diabetes'],
    allergies: ['Penicillin'],
    currentMedications: ['Metformin', 'Lisinopril'],
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    contactNumber: '+1 234-567-8902',
    contactName: 'John Doe',
    location: {
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
    },
    gender: 'female',
    status: 'inactive',
    isVerified: false,
    medicalHistory: ['Asthma'],
    allergies: ['Peanuts'],
    currentMedications: ['Albuterol'],
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@example.com',
    contactNumber: '+1 234-567-8903',
    contactName: 'Mary Johnson',
    location: {
      address: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      postalCode: '60601',
    },
    gender: 'male',
    status: 'suspended',
    isVerified: true,
    medicalHistory: ['Arthritis'],
    allergies: ['Shellfish'],
    currentMedications: ['Ibuprofen'],
  },
];

export function PatientsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setPatients(dummyPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

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
      data={patients}
      columns={patientsColumns}
      onRowClick={handleRowClick}
      onDeleteRows={handleDeleteRows}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      isLoading={isLoading}
    />
  );
}
