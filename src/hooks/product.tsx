import { Prisma } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { PaginateOption } from '@/server/base';
import { addVariantProduct, getAllProducts, getProductById, getProducts, InputVariantProduct } from '@/server/product';
import { UseMutationConfig } from '@/types/types';

export const useProduct = (id: string, include?: Prisma.ProductInclude) => {
  const product = useQuery({
    queryKey: ['product', id],
    queryFn: async () => await getProductById(id, include)
  });
  return product;
};

export const useProducts = (data?: PaginateOption) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const products = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getProducts({ page, pageSize: data?.pageSize, orderBy: data?.orderBy, select: data?.select, where: data?.where })
  });

  return products;
};

export const useProductMutation = (config: UseMutationConfig) => {
  return useMutation({
    mutationFn: async ({ productId, storeId, data }: { productId: string; storeId: string; data: InputVariantProduct }) => {
      return await addVariantProduct({ productId, storeId, data });
    },
    ...config
  });
};

export const useAllProduct = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => await getAllProducts()
  });
};
