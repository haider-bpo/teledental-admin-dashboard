'use client';

import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { DataTable } from '@/components/table/DataTable';
import { dentistsColumns } from './dentists-columns';
import { Dentist } from '../types';

// Dummy data
const dummyDentists: Dentist[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    businessName: 'Smith Dental Care',
    email: 'john.smith@example.com',
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
    dob: new Date('1980-05-15'),
    isApproved: true,
    isVerified: true,
    role: 'user',
    specialities: ['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics'],
    education: [
      {
        degree: 'DDS',
        yearCompleted: '2005',
        schoolName: 'New York University',
        schoolLocation: 'New York, NY',
        certificate: 'Dental Degree',
      },
    ],
    awards: ['Best Dentist 2020', 'Patient Choice Award 2021'],
    insurances: ['Delta Dental', 'Aetna', 'Cigna'],
    business: {
      officeHours: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '17:00',
        },
      ],
      name: 'Smith Dental Care',
      address: '123 Main St, New York, NY 10001',
      webAddress: 'www.smithdental.com',
      picture: '',
    },
    experience: [
      {
        role: 'Senior Dentist',
        employerName: 'City Dental Group',
        location: {
          type: 'Point',
          coordinates: [-73.935242, 40.73061],
        },
        from: new Date('2010-01-01'),
        to: new Date('2020-12-31'),
        currentlyWorking: false,
        certificate: '',
      },
    ],
    personalStatement: {
      languages: [
        {
          language: 'English',
          proficiencyLevel: 'Native',
        },
        {
          language: 'Spanish',
          proficiencyLevel: 'Fluent',
        },
      ],
      description: 'Experienced dentist with a focus on patient care.',
    },
    isDirectOnboarded: true,
    directOnboardingDetails: {
      dentalDegree: 'DDS',
      npi: '1234567890',
      licenses: [
        {
          state: 'NY',
          licenseNumber: 'NY12345',
          isVerified: true,
        },
      ],
      goodStanding: 'yes',
      boardActions: 'no',
      boardActionsExplanation: '',
      specialty: 'General Dentistry',
      specialtyDescription: 'Comprehensive dental care',
      additionalNotes: '',
    },
    status: 'active',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    businessName: 'Johnson Family Dentistry',
    email: 'sarah.j@example.com',
    contactNumber: '+1 234-567-8902',
    contactName: 'Mike Johnson',
    location: {
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      postalCode: '90001',
    },
    gender: 'female',
    dob: new Date('1985-08-20'),
    isApproved: false,
    isVerified: true,
    role: 'user',
    specialities: ['Pediatric Dentistry', 'Preventive Care'],
    education: [
      {
        degree: 'DMD',
        yearCompleted: '2010',
        schoolName: 'University of California',
        schoolLocation: 'Los Angeles, CA',
        certificate: 'Dental Degree',
      },
    ],
    awards: ['Top Pediatric Dentist 2022'],
    insurances: ['Blue Cross', 'MetLife'],
    business: {
      officeHours: [
        {
          day: 'Monday',
          startTime: '08:00',
          endTime: '16:00',
        },
      ],
      name: 'Johnson Family Dentistry',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      webAddress: 'www.johnsondental.com',
      picture: '',
    },
    experience: [
      {
        role: 'Pediatric Dentist',
        employerName: "Children's Dental Center",
        location: {
          type: 'Point',
          coordinates: [-118.243683, 34.052235],
        },
        from: new Date('2015-01-01'),
        to: new Date(),
        currentlyWorking: true,
        certificate: '',
      },
    ],
    personalStatement: {
      languages: [
        {
          language: 'English',
          proficiencyLevel: 'Native',
        },
      ],
      description: 'Specialized in pediatric dental care.',
    },
    isDirectOnboarded: false,
    directOnboardingDetails: {
      dentalDegree: 'DMD',
      npi: '0987654321',
      licenses: [
        {
          state: 'CA',
          licenseNumber: 'CA54321',
          isVerified: true,
        },
      ],
      goodStanding: 'yes',
      boardActions: 'no',
      boardActionsExplanation: '',
      specialty: 'Pediatric Dentistry',
      specialtyDescription: "Children's dental care",
      additionalNotes: '',
    },
    status: 'inactive',
  },
];

export function DentistsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [dentists, setDentists] = useState<Dentist[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchDentists = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setDentists(dummyDentists);
      } catch (error) {
        console.error('Error fetching dentists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentists();
  }, []);

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
      data={dentists}
      columns={dentistsColumns}
      onRowClick={handleRowClick}
      onDeleteRows={handleDeleteRows}
      pageSize={10}
      pageSizeOptions={[5, 10, 25, 50]}
      isLoading={isLoading}
    />
  );
}
