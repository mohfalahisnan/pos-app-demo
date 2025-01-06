'use server';
import { Prisma, Product } from '@prisma/client';

import { prisma } from '@/lib/prisma';

import { entities, PaginatedResult, PaginateOption } from './base';

/**
 * Retrieves a paginated list of products
 * @param data - Pagination options
 * @returns Promise containing paginated product results
 */
export async function getProducts(data: PaginateOption) {
  try {
    const products = await entities.product.paginateFindMany({ ...data });
    return products as unknown as PaginatedResult<Product>;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getVariantAttributeStock(id: string) {
  try {
    return await prisma.stock.findFirst({
      where: {
        variantAttributeId: id
      },
      include: {
        VariantAttribute: true
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

/**
 * Retrieves all active products from the database
 * @returns Promise containing an array of active products
 */
export async function getAllProducts() {
  try {
    const product = await prisma.product.findMany({
      where: {
        isActive: true
      }
    });
    return product;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

/**
 * Creates a new product in the database
 * @param data - Product creation data
 * @returns Promise containing the created product
 */
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

/**
 * Retrieves all categories from the database
 * @returns Promise containing an array of categories
 */
export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

/**
 * Retrieves a specific product by its ID
 * @param id - The unique identifier of the product
 * @param include - Optional Prisma include object for related data
 * @returns Promise containing the found product or null
 */
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

/**
 * Adds variant products with their attributes and stock information
 * @param productId - The ID of the parent product
 * @param storeId - The ID of the store where stock will be stored
 * @param data - Variant product data including attributes and stock information
 * @returns Promise containing the updated product
 */
export async function addVariantProduct({ productId, storeId, data }: { productId: string; storeId: string; data: InputVariantProduct }) {
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
            store: {
              connect: {
                id: storeId
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

/**
 * Transfers product stock from warehouse to store
 * @param productId - The ID of the product to transfer
 * @param warehouseId - The source warehouse ID
 * @param storeId - The destination store ID
 * @param quantity - The quantity to transfer
 * @returns Promise containing the updated stock and logistics log
 * @throws Error if insufficient stock is available
 */
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
