'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/product';

import ProductTable from './product-table';

function Page() {
  const { data, isLoading } = useProducts();
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
      </div>
    );
  return (
    <div>
      {data && <ProductTable data={data.data} />}
      {/* <div className="grid grid-cols-4 gap-4">{data && data.data.map(item => <ProductPopup item={item} key={item.id} />)}</div> */}
    </div>
  );
}

export default Page;
