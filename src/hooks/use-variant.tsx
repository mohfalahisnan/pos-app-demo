import { useQuery } from '@tanstack/react-query';

import { getVariantAttributeStock } from '@/server/product';

export const useVariantAttributeStock = (id: string | undefined) => {
  const variant = useQuery({
    queryKey: ['variantAttribute', id],
    queryFn: async () => {
      return await getVariantAttributeStock(id as string);
    },
    enabled: !!id
  });
  return variant;
};
