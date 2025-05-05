'use client';

import * as z from 'zod';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  validation?: z.ZodType<any>;
  required?: boolean;
  disabled?: boolean;
}

export const formInputSchema = z.object({
  text: z.string().min(1, 'This field is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  number: z.string().refine((val) => !isNaN(Number(val)), 'Must be a number'),
  tel: z.string().min(1, 'This field is required'),
  url: z.string().url('Please enter a valid URL'),
});

export function FormInput({
  name,
  label,
  placeholder,
  type = 'text',
  validation,
  required = false,
  disabled = false,
}: FormInputProps) {
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
            <Input type={type} placeholder={placeholder} disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
