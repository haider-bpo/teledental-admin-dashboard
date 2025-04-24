import { ColumnDef } from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps<TData> {
  columns: ColumnDef<TData>[];
  rowCount?: number;
}

export function TableSkeleton<TData>({ columns, rowCount = 5 }: TableSkeletonProps<TData>) {
  // Filter out columns that can't be hidden (always visible)
  const visibleColumns = columns.filter(
    (col) => typeof col.enableHiding === 'undefined' || col.enableHiding !== false,
  );

  return (
    <div className="space-y-4">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" /> {/* View button */}
          <Skeleton className="h-10 w-24" /> {/* Add Item button */}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((column, i) => (
                  <TableHead key={i} className="h-11 px-4">
                    <Skeleton className={getColumnSkeletonClass(column)} />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-transparent">
                  {columns.map((column, cellIndex) => (
                    <TableCell key={cellIndex} className="px-4 py-3">
                      <Skeleton className={getColumnSkeletonClass(column)} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-[70px]" />
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to determine skeleton width based on column type
function getColumnSkeletonClass(column: ColumnDef<any>) {
  const baseClass = 'h-4';

  // Get the column ID
  const columnId = column.id?.toLowerCase();

  // Define width mappings for different column types
  switch (columnId) {
    case 'select':
      return `${baseClass} w-4`;
    case 'actions':
      return `${baseClass} w-20`;
    case 'status':
      return `${baseClass} w-24`;
    case 'email':
      return `${baseClass} w-[200px]`;
    case 'name':
      return `${baseClass} w-[150px]`;
    case 'role':
      return `${baseClass} w-[100px]`;
    default:
      return `${baseClass} w-[150px]`;
  }
}
