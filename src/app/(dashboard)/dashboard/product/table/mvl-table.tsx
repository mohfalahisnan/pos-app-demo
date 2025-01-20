import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table';
import { getPaginationRowModel } from '@tanstack/react-table';
import { useReactTable } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

import { TableHeader as THeader } from './table-header';

type MvlTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const MvlTable = <T,>({ data, columns }: MvlTableProps<T>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false
  });
  return (
    <div className="w-full min-w-2xl space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <THeader key={header.id} header={header} />;
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-card">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    const { cellType } = cell.column.columnDef.meta || ({} as any);
                    return (
                      <TableCell key={cell.id}>
                        {cellType === 'image' ? (
                          <Image src={cell.getValue() as string} alt="test" width={200} height={200} className="w-32 aspect-square object-cover rounded" />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex bg-accent items-center p-4 w-full">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MvlTable;
