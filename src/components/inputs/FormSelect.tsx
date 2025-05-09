'use client';

import * as z from 'zod';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Option<T = string> {
  label: string;
  value: T;
}

interface FormSelectProps<T = string> {
  name: string;
  label: string;
  options: Option<T>[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export const formSelectSchema = z.object({
  select: z.string().min(1, 'Please select an option'),
});

export function FormSelect<T = string>({
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
}: FormSelectProps<T>) {
  const form = useFormContext();

  const handleValueChange = (value: string) => {
    // Convert string values to appropriate types
    let convertedValue: T;
    if (typeof options[0]?.value === 'boolean') {
      convertedValue = (value === 'true') as T;
    } else if (typeof options[0]?.value === 'number') {
      convertedValue = Number(value) as T;
    } else {
      convertedValue = value as T;
    }
    form.setValue(name, convertedValue);
  };

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
          <Select onValueChange={handleValueChange} value={String(field.value)} disabled={disabled}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
