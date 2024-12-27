import { getWarehouses } from "@/server/warehouse";
import { useQuery } from "@tanstack/react-query";

export const useWarehouse = () => {
  const data = useQuery({
    queryKey: ["warehouses"],
    queryFn: getWarehouses,
  });
  return data;
};
