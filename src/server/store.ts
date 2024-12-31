"use server";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { entities } from "./base";

enum BASE_ERROR {
  USER_NOT_FOUND = "User not found",
}

export async function auth() {
  return await getServerSession(authOptions);
}

export async function userRole(id: string) {
  const user = await entities.user.findUnique({
    where: { id },
    select: { role: true },
  });
  if (!user) return BASE_ERROR.USER_NOT_FOUND;
  return user.role;
}

export async function isStoreUser(userId: string, storeId: string) {
  const role = await userRole(userId);
  if (role === "MODERATOR" || role === "ADMIN") {
    const isUser = await entities.store.findFirst({
      where: {
        id: storeId,
        User: {
          some: {
            id: userId,
          },
        },
      },
    });
    if (isUser) return true;
  }
  if (role === "SUPERADMIN") return true;
  return false;
}

export async function getUserStores() {
  const data = await auth();
  if (!data?.user) throw new Error();
  const stores = await entities.store.findMany({
    where: {
      User: {
        some: {
          email: data.user.email as string,
        },
      },
    },
  });
  return stores;
}

export async function getStores() {
  return await entities.store.findMany();
}

export async function addStore(data: Prisma.StoreCreateInput) {
  return await entities.store.create({
    data,
  });
}
