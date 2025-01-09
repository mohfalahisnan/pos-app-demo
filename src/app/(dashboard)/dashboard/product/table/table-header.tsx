import { Column, flexRender, Header } from '@tanstack/react-table';
import { ArrowUpDown, FilterIcon, Search } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { SelectTrigger } from '@/components/ui/select';
import { SelectContent } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { Select } from '@/components/ui/select';
import { TableHead } from '@/components/ui/table';

export function TableHeader<T>({ header }: { header: Header<T, any> }) {
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
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterOptions } = column.columnDef.meta ?? ({} as any);

  return filterVariant === 'range' ? (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size={'icon'} className="rounded">
            <FilterIcon size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-sm">
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
        </PopoverContent>
      </Popover>
    </div>
  ) : filterVariant === 'select' ? (
    <>
      <Select onValueChange={value => column.setFilterValue(value)} value={columnFilterValue?.toString()}>
        <SelectTrigger>
          <FilterIcon size={14} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={null as unknown as string}>All</SelectItem>
          {(filterOptions as string[] | undefined)?.map(item => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
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
  );
}
