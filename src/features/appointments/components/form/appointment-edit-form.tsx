import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/inputs/FormInput';
import { FormSelect } from '@/components/inputs/FormSelect';
import { FormTextarea } from '@/components/inputs/FormTextarea';
import { SearchableSelect } from '@/components/inputs/searchable-select';
import { Button } from '@/components/ui/button';
import type { Appointment } from '../../types';
import { Loader2 } from 'lucide-react';
import { usePatients } from '@/features/patients/hooks/use-patients';
import { useDentists } from '@/features/dentists/hooks/use-dentists';

const appointmentFormSchema = z.object({
  patientId: z.string().min(1, 'Patient is required'),
  patientName: z.string().min(1, 'Patient name is required'),
  patientEmail: z.string().email('Please enter a valid email address'),
  dentistId: z.string().min(1, 'Dentist is required'),
  dentistName: z.string().min(1, 'Dentist name is required'),
  slotId: z.string().min(1, 'Slot ID is required'),
  slot: z.string().min(1, 'Slot is required'),
  patientLink: z.string().url('Please enter a valid URL').optional(),
  dentistLink: z.string().url('Please enter a valid URL').optional(),
  isApproved: z.boolean(),
  activeChatId: z.string().optional(),
  concern: z.string().optional(),
  swelling: z.string().optional(),
  pain: z.string().optional(),
  hurt: z.string().optional(),
  located: z.string().optional(),
  dateOfLastDentalVisit: z.string().optional(),
  medicalCond: z.string().optional(),
  antibiotic: z.string().optional(),
  allergic: z.string().optional(),
  allergicDesc: z.string().optional(),
  medicalCondBeAware: z.string().optional(),
  currentMedication: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  appointmentDate: z.string().min(1, 'Appointment date is required'),
  fromDentist: z.boolean(),
  timeZone: z.string().min(1, 'Time zone is required'),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentEditFormProps {
  appointment: Partial<Appointment>;
  onSubmit: (data: AppointmentFormValues) => void;
  isLoading?: boolean;
}

function AppointmentEditForm({ appointment, onSubmit, isLoading }: AppointmentEditFormProps) {
  const { data: patients = [], isLoading: isLoadingPatients } = usePatients();
  const { data: dentists = [], isLoading: isLoadingDentists } = useDentists();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientId: appointment.patientId ?? '',
      patientName: appointment.patientName ?? '',
      patientEmail: appointment.patientEmail ?? '',
      dentistId: appointment.dentistId ?? '',
      dentistName: appointment.dentistName ?? '',
      slotId: appointment.slotId ?? '',
      slot: appointment.slot ?? '',
      patientLink: appointment.patientLink ?? '',
      dentistLink: appointment.dentistLink ?? '',
      isApproved: appointment.isApproved ?? false,
      activeChatId: appointment.activeChatId ?? '',
      concern: appointment.concern ?? '',
      swelling: appointment.swelling ?? '',
      pain: appointment.pain ?? '',
      hurt: appointment.hurt ?? '',
      located: appointment.located ?? '',
      dateOfLastDentalVisit: appointment.dateOfLastDentalVisit ?? '',
      medicalCond: appointment.medicalCond ?? '',
      antibiotic: appointment.antibiotic ?? '',
      allergic: appointment.allergic ?? '',
      allergicDesc: appointment.allergicDesc ?? '',
      medicalCondBeAware: appointment.medicalCondBeAware ?? '',
      currentMedication: appointment.currentMedication ?? '',
      title: appointment.title ?? '',
      appointmentDate: appointment.appointmentDate ?? '',
      fromDentist: appointment.fromDentist ?? false,
      timeZone: appointment.timeZone ?? '',
    },
  });

  // Watch patient and dentist selections to update their names
  const patientId = form.watch('patientId');
  const dentistId = form.watch('dentistId');

  // Update patient name and email when patient is selected
  React.useEffect(() => {
    if (patientId) {
      const selectedPatient = patients.find((p) => p._id === patientId);
      if (selectedPatient) {
        form.setValue('patientName', `${selectedPatient.firstName} ${selectedPatient.lastName}`);
        form.setValue('patientEmail', selectedPatient.email);
      }
    }
  }, [patientId, patients, form]);

  // Update dentist name when dentist is selected
  React.useEffect(() => {
    if (dentistId) {
      const selectedDentist = dentists.find((d) => d._id === dentistId);
      if (selectedDentist) {
        form.setValue('dentistName', `${selectedDentist.firstName} ${selectedDentist.lastName}`);
      }
    }
  }, [dentistId, dentists, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInput name="title" label="Title" required />
          <FormInput name="appointmentDate" label="Appointment Date" type="text" required />
          <SearchableSelect
            name="patientId"
            label="Patient"
            options={patients.map((patient) => ({
              value: patient._id,
              label: `${patient.firstName} ${patient.lastName}`,
            }))}
            required
            isLoading={isLoadingPatients}
            currentValue={
              appointment.patientId
                ? {
                    value: appointment.patientId,
                    label: appointment.patientName || '',
                  }
                : undefined
            }
          />
          <FormInput name="patientEmail" label="Patient Email" type="email" required disabled />

          <SearchableSelect
            name="dentistId"
            label="Dentist"
            options={dentists.map((dentist) => ({
              value: dentist._id,
              label: `${dentist.firstName} ${dentist.lastName}`,
            }))}
            required
            isLoading={isLoadingDentists}
            currentValue={
              appointment.dentistId
                ? {
                    value: appointment.dentistId,
                    label: appointment.dentistName || '',
                  }
                : undefined
            }
          />
          <FormInput name="dentistName" label="Dentist Name" required disabled />

          <FormInput name="slot" label="Time Slot" required />
          <FormInput name="timeZone" label="Time Zone" required />
          <FormSelect<boolean>
            name="isApproved"
            label="Approval Status"
            options={[
              { value: true, label: 'Approved' },
              { value: false, label: 'Not Approved' },
            ]}
          />
          {/* Hidden fields for required IDs */}
          <input type="hidden" {...form.register('slotId')} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medical Information</h3>
          <FormTextarea name="concern" label="Concern" placeholder="Enter patient's concern" />
          <FormTextarea name="swelling" label="Swelling" placeholder="Enter swelling details" />
          <FormTextarea name="pain" label="Pain" placeholder="Enter pain details" />
          <FormTextarea name="hurt" label="Hurt" placeholder="Enter hurt details" />
          <FormTextarea name="located" label="Location" placeholder="Enter location details" />
          <FormInput name="dateOfLastDentalVisit" label="Last Dental Visit" type="text" />
          <FormTextarea
            name="medicalCond"
            label="Medical Condition"
            placeholder="Enter medical conditions"
          />
          <FormTextarea
            name="antibiotic"
            label="Antibiotic"
            placeholder="Enter antibiotic details"
          />
          <FormTextarea name="allergic" label="Allergies" placeholder="Enter allergies" />
          <FormTextarea
            name="allergicDesc"
            label="Allergy Description"
            placeholder="Enter allergy description"
          />
          <FormTextarea
            name="medicalCondBeAware"
            label="Medical Conditions to be Aware of"
            placeholder="Enter medical conditions to be aware of"
          />
          <FormTextarea
            name="currentMedication"
            label="Current Medication"
            placeholder="Enter current medications"
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
    </>
  );
}

export default AppointmentEditForm;
