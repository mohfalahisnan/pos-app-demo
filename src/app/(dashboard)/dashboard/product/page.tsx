"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/server/product";
import { useQuery } from "@tanstack/react-query";
import ProductPopup from "./product-popup";

function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts({}),
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
  return (
    <div className="grid grid-cols-4 gap-4">
      {data &&
        data.data.map((item) => <ProductPopup item={item} key={item.id} />)}
    </div>
  );
}

export default Page;
