import { ColumnDef, Row, Table } from '@tanstack/react-table';

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: Row<TData>) => void;
  onDeleteRows?: (rows: Row<TData>[]) => void;
  onAddItem?: () => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export interface TableHeaderProps<TData> {
  table: Table<TData>;
  onDeleteRows?: (rows: Row<TData>[]) => void;
  onAddItem?: () => void;
  selectedRows: Row<TData>[];
}

export interface TablePaginationProps {
  table: Table<any>;
  pageSizeOptions?: number[];
}

export interface TableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit?: (row: Row<TData>) => void;
  onDelete?: (row: Row<TData>) => void;
  onDuplicate?: (row: Row<TData>) => void;
  onArchive?: (row: Row<TData>) => void;
}

export interface TableFiltersProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}
