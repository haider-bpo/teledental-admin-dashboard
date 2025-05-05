'use client';

import * as z from 'zod';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface FormCheckboxProps {
  name: string;
  label: string;
  validation?: z.ZodType<any>;
  required?: boolean;
  disabled?: boolean;
}

export const formCheckboxSchema = z.object({
  checkbox: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export function FormCheckbox({
  name,
  label,
  validation,
  required = false,
  disabled = false,
}: FormCheckboxProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
