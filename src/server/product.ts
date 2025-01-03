'use server';
import { Prisma, Product } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { entities, PaginatedResult, PaginateOption } from './base';

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
      data
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

export async function getProductById(id: string, include?: Prisma.ProductInclude) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include
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

export async function addVariantProduct({ productId, warehouseId, data }: { productId: string; warehouseId: string; data: InputVariantProduct }) {
  try {
    for (const variantData of data.variant) {
      const variant = await prisma.variant.create({
        data: {
          name: variantData.name,
          productId: productId
        }
      });

      for (const variantAttribute of variantData.attributes) {
        await prisma.stock.create({
          data: {
            quantity: parseInt(variantAttribute.stock),
            VariantAttribute: {
              create: {
                name: variantAttribute.name,
                Price: variantAttribute.price,
                variantId: variant.id
              }
            },
            Product: {
              connect: {
                id: productId
              }
            },
            warehouse: {
              connect: {
                id: warehouseId //warehouseId
              }
            }
          }
        });
      }
    }
    return await prisma.product.findUnique({ where: { id: productId } });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function warehouseToStore(productId: string, warehouseId: string, storeId: string, quantity: number) {
  try {
    return prisma.$transaction(async tx => {
      const stock = await tx.stock.update({
        where: {
          id: '',
          productId,
          warehouseId
        },
        data: {
          quantity: {
            decrement: quantity
          }
        }
      });

      if (stock.quantity < 0) {
        throw new Error('Insufficient stock');
      }

      const log = await tx.logistics.create({
        data: {
          transactionType: 'WAREHOUSE_TO_STORE',
          destinationId: storeId,
          sourceId: warehouseId,
          quantity: quantity,
          status: 'PENDING',
          productId: productId
        }
      });

      return { stock, log };
    });
  } catch (error) {
    throw new Error('Insufficient stock');
  }
}
