'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';

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
        cell: info => (
          <div className="text-left w-full items-start gap-2 flex">
            <div>
              <Image
                src={info.row.original.imageUrl || '/image1.jpg'}
                title={info.row.original.name}
                alt={info.row.original.name}
                width={200}
                height={200}
                className="w-20 aspect-square object-cover rounded"
              />
            </div>
            <div>
              <div className="text-base capitalize font-bold">{info.row.original.name}</div>
              <div className="text-xs text-muted-foreground">{info.row.original.description}</div>
            </div>
          </div>
        )
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        CellClass: 'text-left uppercase'
      },
      {
        accessorKey: 'description',
        header: 'Description',
        CellClass: 'text-left',
        meta: {
          filterVariant: 'select',
          filter: true,
          filterOptions: ['lorem', 'ipsum', 'dolor', 'sit', 'amet']
        }
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
    actions: [
      {
        label: 'Edit',
        onClick: a => {
          console.log(a.id);
        }
      }
    ],
    selectable: true,
    showAction: true
  });
  if (isLoading)
    return (
      <div className="w-full p-4 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-10 animate-pulse" />
        ))}
      </div>
    );
  return <div>{data && <MvlTable data={data.data} columns={columns} />}</div>;
}

export default Page;
