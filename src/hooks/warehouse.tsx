import { useQuery } from '@tanstack/react-query';

import { getWarehouses } from '@/server/warehouse';

export const useWarehouse = () => {
  const data = useQuery({
    queryKey: ['warehouses'],
    queryFn: getWarehouses
  });
  return data;
};
