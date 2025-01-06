'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';

/**
 * Retrieves all warehouses from the database.
 * @returns {Promise<any[]>} An array of warehouse objects.
 */
export async function getWarehouses(): Promise<any[]> {
  try {
    const data = await prisma.warehouse.findMany();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

/**
 * Adds a new warehouse to the database.
 * @param {Prisma.WarehouseCreateInput} data - The data for the new warehouse.
 * @returns {Promise<any>} The newly created warehouse object.
 */
export async function addWarehouse(data: Prisma.WarehouseCreateInput): Promise<any> {
  try {
    const warehouse = await prisma.warehouse.create({
      data
    });
    return warehouse;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
