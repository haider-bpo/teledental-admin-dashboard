import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ColumnToggle } from './ColumnToggle';

interface TableFiltersProps<TData> {
  table: any;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function TableFilters<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: TableFiltersProps<TData>) {
  return (
    <div className="flex w-full items-center gap-2 sm:max-w-sm">
      <div className="relative w-full">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search in all columns..."
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-10 w-full pl-9 text-sm"
        />
      </div>
      <ColumnToggle table={table} />
    </div>
  );
}
