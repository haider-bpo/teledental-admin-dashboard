import { Table } from '@tanstack/react-table';

interface TableCountProps<TData> {
  table: Table<TData>;
}

export function TableCount<TData>({ table }: TableCountProps<TData>) {
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getSelectedRowModel().rows.length;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {selectedRows > 0 ? (
        <p>{selectedRows} of {totalRows} row(s) selected</p>
      ) : (
        <p className='text-brand-primary font-bold text-xl pr-4'>Count: {totalRows}</p>
      )}
    </div>
  );
}
