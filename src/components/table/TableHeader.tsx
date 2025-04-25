import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TableHeaderProps } from './types';
import { ColumnToggle } from './ColumnToggle';

export function TableHeader<TData>({ table, onAddItem }: TableHeaderProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-2">
      <ColumnToggle table={table} />
      {onAddItem && (
        <Button
          onClick={onAddItem}
          size="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-10"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      )}
    </div>
  );
}
