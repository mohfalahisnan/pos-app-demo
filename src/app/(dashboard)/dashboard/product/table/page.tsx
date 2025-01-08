'use client';

import { Product } from '@prisma/client';

import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/product';

import MvlTable from './mvl-table';
import { createColumns } from './utils/columns';

function Page() {
  const { data, isLoading } = useProducts();
  const columns = createColumns<Product>({
    columns: [
      {
        accessorKey: 'name',
        header: 'Name',
        CellClass: 'text-left capitalize'
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        CellClass: 'text-left uppercase'
      },
      {
        accessorKey: 'price',
        header: 'Price',
        meta: {
          filterVariant: 'range',
          filter: true
        }
      }
    ],
    actions: [],
    selectable: true,
    showAction: false
  });
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
      </div>
    );
  return <div>{data && <MvlTable data={data.data} columns={columns} />}</div>;
}

export default Page;
