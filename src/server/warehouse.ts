"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getWarehouses() {
  try {
    const data = await prisma.warehouse.findMany();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function addWarehouse(data: Prisma.WarehouseCreateInput) {
  try {
    const warehouse = await prisma.warehouse.create({
      data,
    });
    return warehouse;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
