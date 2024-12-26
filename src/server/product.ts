"use server";
import { prisma } from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";
import { entities, PaginatedResult } from "./base";

export async function getProducts() {
  try {
    const products = await entities.product.paginateFindMany({});

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
