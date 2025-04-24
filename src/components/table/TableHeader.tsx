import { Row } from '@tanstack/react-table';
import { PlusIcon, TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TableHeaderProps } from './types';
import { ColumnToggle } from './ColumnToggle';

export function TableHeader<TData>({
  table,
  onDeleteRows,
  onAddItem,
  selectedRows,
}: TableHeaderProps<TData>) {
  const handleDeleteRows = () => {
    if (onDeleteRows) {
      onDeleteRows(selectedRows);
      table.resetRowSelection();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {selectedRows.length > 0 && (
        <Button variant="outline" size="sm" onClick={handleDeleteRows} className="h-10">
          <TrashIcon className="mr-2 h-4 w-4" />
          Delete ({selectedRows.length})
        </Button>
      )}
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
