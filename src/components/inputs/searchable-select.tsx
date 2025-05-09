'use client';

import { useId, useState } from 'react';
import { CheckIcon, ChevronDownIcon, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  currentValue?: Option;
}

export function SearchableSelect({
  name,
  label,
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  isLoading = false,
  currentValue,
}: SearchableSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const form = useFormContext();

  return (
    <div className="*:not-first:mt-2">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id={id}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled || isLoading}
                    className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                  >
                    <span className={cn('truncate', !field.value && 'text-muted-foreground')}>
                      {field.value
                        ? options.find((option) => option.value === field.value)?.label
                        : currentValue?.label || placeholder}
                    </span>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ChevronDownIcon
                        size={16}
                        className="text-muted-foreground/80 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="border-input pointer-events-auto w-195 min-w-[var(--radix-popover-anchor-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                  <CommandList>
                    {isLoading ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                      </div>
                    ) : (
                      <>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <ScrollArea className="h-[300px]">
                          <CommandGroup>
                            {options.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                  field.onChange(currentValue === field.value ? '' : currentValue);
                                  setOpen(false);
                                }}
                                className={cn(
                                  'mb-1 w-full cursor-pointer',
                                  field.value === option.value &&
                                    'text-brand-primary mx-0 rounded-md bg-gray-100 p-2 font-medium',
                                )}
                              >
                                <span>{option.label}</span>
                                {field.value === option.value && (
                                  <CheckIcon size={16} className="ml-auto" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
