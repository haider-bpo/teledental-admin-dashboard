'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TableHeader as TableHeaderComponent } from './TableHeader';
import { TablePagination } from './TablePagination';
import { TableFilters } from './TableFilters';
import { TableSkeleton } from './TableSkeleton';
import { TableProps } from './types';
import { Button } from '@/components/ui/button';

// Define fuzzy filter function
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define global filter function
const globalFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const searchableValues = row
    .getAllCells()
    .filter((cell) => {
      // Only include cells from columns that are visible and have accessorKey
      const column = cell.column;
      return (
        column.getCanFilter() && column.getIsVisible() && typeof column.accessorFn !== 'undefined'
      );
    })
    .map((cell) => {
      const value = cell.getValue();
      return value ? String(value).toLowerCase() : '';
    })
    .join(' ');

  const itemRank = rankItem(searchableValues, value.toLowerCase());
  addMeta(itemRank);
  return itemRank.passed;
};

export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  onRowClick,
  onDeleteRows,
  onAddItem,
  isLoading = false,
  error,
  className,
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: globalFilterValue,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilterValue,
    globalFilterFn: globalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const selectedRows = table.getSelectedRowModel().rows;

  if (isLoading) {
    return <TableSkeleton columns={columns} rowCount={pageSize} />;
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TableFilters
            table={table}
            globalFilter={globalFilterValue}
            setGlobalFilter={setGlobalFilterValue}
          />
          <TableHeaderComponent
            table={table}
            onDeleteRows={onDeleteRows}
            onAddItem={onAddItem}
            selectedRows={selectedRows}
          />
        </div>

        <div className="rounded-lg border">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
                    {headerGroup.headers.map((header) => {
                      const isSortable = header.column.getCanSort();
                      const sortDirection = header.column.getIsSorted();

                      return (
                        <TableHead
                          key={header.id}
                          className="text-muted-foreground h-11 px-4 text-sm font-medium whitespace-nowrap"
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center gap-2">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {isSortable && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => header.column.toggleSorting()}
                                >
                                  {sortDirection === 'asc' ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : sortDirection === 'desc' ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronsUpDown className="h-4 w-4" />
                                  )}
                                </Button>
                              )}
                            </div>
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() => onRowClick?.(row)}
                      className={`${onRowClick ? 'cursor-pointer' : ''} border-b last:border-0`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {error || 'No results.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <TablePagination table={table} pageSizeOptions={pageSizeOptions} />
      </div>
    </div>
  );
}
