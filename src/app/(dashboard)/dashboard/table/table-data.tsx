'use client';
import { Product } from '@prisma/client';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const columns: ColumnDef<Product, any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="w-4 pl-4  pr-4 lg:pr-0 flex justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-4 pl-4 pr-4 lg:pr-0  flex justify-center text-center">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: (info: any) => info.getValue(),
    meta: {
      cellType: 'image'
    },
    enableColumnFilter: false,
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info: any) => info.getValue()
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: (info: any) => info.getValue()
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info: any) => info.getValue(),
    meta: {
      filterVariant: 'select',
      filter: true
    }
  }
];

function TableData({
  data
}: //   pageSize = 10,
//   enableSearch = false,
{
  data: Product[];

  //   pageSize: number;
  //   enableSearch?: boolean;
}) {
  //   const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns: columns,
    filterFns: {},
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  });
  return (
    <div className="w-full min-w-2xl space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: 'flex items-center justify-between font-bold text-md select-none capitalize'
                          }}
                        >
                          {header.column.getCanSort() ? (
                            <Button
                              variant={'ghost'}
                              className="flex-1 cursor-pointer w-32 p-0 justify-start items-center flex"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <ArrowUp />,
                                desc: <ArrowDown />
                              }[header.column.getIsSorted() as string] ?? <ArrowUpDown opacity={0.3} />}
                            </Button>
                          ) : (
                            <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                          )}

                          {header.column.getCanFilter() ? (
                            <div className="flex h-full gap-1 items-center">
                              <div className="py-2">
                                <Filter column={header.column} />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </TableHead>
                  );
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}

export default TableData;

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? ({} as any);
  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select onChange={e => column.setFilterValue(e.target.value)} value={columnFilterValue?.toString()}>
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size={'icon'} className="rounded">
            <Search size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-sm">
          <DebouncedInput
            className="border shadow rounded"
            onChange={value => column.setFilterValue(value)}
            placeholder={`Search...`}
            type="text"
            value={(columnFilterValue ?? '') as string}
          />
        </PopoverContent>
      </Popover>
    </div>
    // See faceted column filters example for datalist search suggestions
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <Input {...props} value={value} onChange={e => setValue(e.target.value)} className="bg-white" />;
}
