import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/inputs/FormInput';
import { FormSelect } from '@/components/inputs/FormSelect';
import { Button } from '@/components/ui/button';
import type { Dentist } from '../../types';
import { Loader2 } from 'lucide-react';

const dentistFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  contactName: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  businessName: z.string().optional(),
  location: z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    postalCode: z.string().min(1, 'Postal Code is required'),
  }),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
});

export type DentistFormValues = z.infer<typeof dentistFormSchema>;

interface DentistEditFormProps {
  dentist: Partial<Dentist>;
  onSubmit: (data: DentistFormValues) => void;
  isLoading?: boolean;
}

function DentistEditForm({ dentist, onSubmit, isLoading }: DentistEditFormProps) {
  const form = useForm<DentistFormValues>({
    resolver: zodResolver(dentistFormSchema),
    defaultValues: {
      firstName: dentist.firstName ?? '',
      lastName: dentist.lastName ?? '',
      email: dentist.email ?? '',
      contactNumber: dentist.contactNumber ?? '',
      contactName: dentist.contactName ?? '',
      gender: dentist.gender,
      businessName: dentist.businessName ?? '',
      location: {
        type: dentist.location?.type ?? 'Point',
        coordinates: dentist.location?.coordinates ?? [0, 0],
        address: dentist.location?.address ?? '',
        city: dentist.location?.city ?? '',
        state: dentist.location?.state ?? '',
        country: dentist.location?.country ?? '',
        postalCode: dentist.location?.postalCode ?? '',
      },
      status: dentist.status,
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
          <FormInput name="businessName" label="Business Name" />
          <FormInput name="location.address" label="Address" required />
          <FormInput name="location.city" label="City" required />
          <FormInput name="location.state" label="State" required />
          <FormInput name="location.country" label="Country" required />
          <FormInput name="location.postalCode" label="Postal Code" required />
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

export default DentistEditForm;
