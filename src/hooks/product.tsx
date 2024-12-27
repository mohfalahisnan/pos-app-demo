import { PaginateOption } from "@/server/base";
import {
  addVariantProduct,
  getProductById,
  getProducts,
  InputVariantProduct,
} from "@/server/product";
import { Prisma } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProduct = (id: string, include?: Prisma.ProductInclude) => {
  const product = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await getProductById(id, include),
  });
  return product;
};

export const useProducts = (data?: PaginateOption) => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts({ ...data }),
  });
  return products;
};

export const useProductMutation = () => {
  const variant = useMutation({
    mutationFn: async ({
      productId,
      warehouseId,
      data,
    }: {
      productId: string;
      warehouseId: string;
      data: InputVariantProduct;
    }) => await addVariantProduct({ productId, warehouseId, data }),
  });
  return variant;
};
