'use client';

import * as z from 'zod';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  validation?: z.ZodType<any>;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const formTextareaSchema = z.object({
  textarea: z.string().min(1, 'This field is required'),
});

export function FormTextarea({
  name,
  label,
  placeholder,
  validation,
  required = false,
  disabled = false,
  rows = 4,
}: FormTextareaProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} disabled={disabled} rows={rows} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
