"use server";
import { prisma } from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";
import { entities, PaginatedResult, PaginateOption } from "./base";

export async function getProducts(data: PaginateOption) {
  try {
    const products = await entities.product.paginateFindMany({ ...data });
    return products as unknown as PaginatedResult<Product>;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function addProduct(data: Prisma.ProductCreateInput) {
  try {
    const product = await prisma.product.create({
      data,
    });
    return product;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getProductById(
  id: string,
  include?: Prisma.ProductInclude
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include,
    });
    return product;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export type InputVariantProduct = {
  variant: {
    name: string;
    attributes: {
      name: string;
      price: string;
      stock: string;
    }[];
  }[];
};

export async function addVariantProduct({
  productId,
  warehouseId,
  data,
}: {
  productId: string;
  warehouseId: string;
  data: InputVariantProduct;
}) {
  try {
    for (const variantData of data.variant) {
      const variant = await prisma.variant.create({
        data: {
          name: variantData.name,
          productId: productId,
        },
      });

      for (const variantAttribute of variantData.attributes) {
        await prisma.stock.create({
          data: {
            quantity: parseInt(variantAttribute.stock),
            VariantAttribute: {
              create: {
                name: variantAttribute.name,
                Price: variantAttribute.price,
                variantId: variant.id,
              },
            },
            Product: {
              connect: {
                id: productId,
              },
            },
            warehouse: {
              connect: {
                id: warehouseId, //warehouseId
              },
            },
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
