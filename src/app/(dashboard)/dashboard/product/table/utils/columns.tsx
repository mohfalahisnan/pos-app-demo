import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type DeepKeys<T> = T extends object
  ? {
      [K in keyof T & string]: `${K}` | `${K}.${DeepKeys<T[K]>}`;
    }[keyof T & string]
  : never;

export type ColumnConfig<T> = ColumnDef<T> & {
  meta?: {
    filterVariant?: 'range' | 'select' | 'text';
    filter?: boolean;
  };
  CellClass?: string;
};

export type ActionConfig<T> = {
  label: string;
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClick: (row: T) => void;
};

export type CreateColumnsProps<T> = {
  columns: ColumnConfig<T>[];
  actions: ActionConfig<T>[];
  showAction?: boolean;
  selectable?: boolean;
};

export const createColumns = <T extends Record<string, any>>({
  columns,
  actions,
  showAction = true,
  selectable = true
}: CreateColumnsProps<T>): ColumnDef<T>[] => [
  ...(selectable
    ? [
        {
          id: 'select',
          header: ({ table }: { table: any }) => (
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
              onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }: { row: any }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />
          ),
          enableSorting: false,
          enableHiding: false
        }
      ]
    : []),
  ...columns.map((column: any) => ({
    accessorKey: column.accessorKey,
    cell: (row: any) => <div className={column.CellClass}>{row.getValue(column.accessorKey)}</div>,
    // meta: column.meta,
    ...column
  })),
  ...(showAction
    ? [
        {
          id: 'actions',
          cell: ({ row }: { row: any }) => {
            const rowData = row.original;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {actions.map((action, index) => (
                    <DropdownMenuItem key={index} onClick={() => action.onClick(rowData)}>
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
        }
      ]
    : [])
];
