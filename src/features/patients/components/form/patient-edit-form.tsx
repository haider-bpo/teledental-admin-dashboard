'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/inputs/FormInput';
import { FormSelect } from '@/components/inputs/FormSelect';
import { FormTextarea } from '@/components/inputs/FormTextarea';
import { Button } from '@/components/ui/button';
import type { Patient } from '../../types';
import { Loader2 } from 'lucide-react';

const patientFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  contactName: z.string().optional(),
  location: z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
    address: z.string().min(1, 'Address is required'),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  }),
  gender: z.enum(['male', 'female', 'other']).optional(),
  medicalHistory: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  currentMedications: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientEditFormProps {
  patient: Partial<Patient>;
  onSubmit: (data: Partial<Patient>) => void;
  isLoading?: boolean;
}

function PatientEditForm({ patient, onSubmit, isLoading }: PatientEditFormProps) {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: patient.firstName ?? '',
      lastName: patient.lastName ?? '',
      email: patient.email ?? '',
      contactNumber: patient.contactNumber ?? '',
      contactName: patient.contactName ?? '',
      location: {
        type: patient.location?.type ?? 'Point',
        coordinates: patient.location?.coordinates ?? [0, 0],
        address: patient.location?.address ?? '',
        city: patient.location?.city,
        state: patient.location?.state,
        country: patient.location?.country,
        postalCode: patient.location?.postalCode,
      },
      gender: patient.gender,
      medicalHistory: patient.medicalHistory ?? [],
      allergies: patient.allergies ?? [],
      currentMedications: patient.currentMedications ?? [],
      status: patient.status,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput name="firstName" label="First Name" required />
          <FormInput name="lastName" label="Last Name" required />
          <FormInput name="email" label="Email" type="email" required />
          <FormInput name="contactNumber" label="Contact Number" type="tel" required />
          <FormInput name="contactName" label="Contact Name" />
          <FormSelect
            name="gender"
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
          <FormInput name="location.address" label="Address" required />
          <FormInput name="location.city" label="City" />
          <FormInput name="location.state" label="State" />
          <FormInput name="location.country" label="Country" />
          <FormInput name="location.postalCode" label="Postal Code" />
          <FormSelect
            name="status"
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'suspended', label: 'Suspended' },
            ]}
          />
        </div>

        <FormTextarea
          name="medicalHistory"
          label="Medical History"
          placeholder="Enter medical history (one per line)"
        />
        <FormTextarea
          name="allergies"
          label="Allergies"
          placeholder="Enter allergies (one per line)"
        />
        <FormTextarea
          name="currentMedications"
          label="Current Medications"
          placeholder="Enter current medications (one per line)"
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PatientEditForm;
