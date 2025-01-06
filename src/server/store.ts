'use server';
import { Prisma, Store } from '@prisma/client';
import { getServerSession, Session } from 'next-auth';

import { ERROR_CODES } from '@/constants/constant';
import { authOptions } from '@/lib/auth';

import { entities } from './base';

/**
 * Authenticates the current session using NextAuth.
 * @returns {Promise<Session | null>} The session object if authenticated, otherwise null.
 */
export async function auth(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

/**
 * Retrieves the role of a user by their ID.
 * @param id : string - The ID of the user.
 * @returns {Promise<string | ERROR_CODES>} The role of the user or an error if the user is not found.
 */
export async function userRole(id: string): Promise<string | ERROR_CODES> {
  const user = await entities.user.findUnique({
    where: { id },
    select: { role: true }
  });
  if (!user) return ERROR_CODES.USER_NOT_FOUND;
  return user.role;
}

/**
 * Checks if a user is associated with a store.
 * @param userId : string - The ID of the user.
 * @param storeId : string - The ID of the store.
 * @returns {Promise<boolean>} True if the user is associated with the store, otherwise false.
 */
export async function isStoreUser(userId: string, storeId: string): Promise<boolean> {
  const role = await userRole(userId);
  if (role === 'MODERATOR' || role === 'ADMIN') {
    const isUser = await entities.store.findFirst({
      where: {
        id: storeId,
        User: {
          some: {
            id: userId
          }
        }
      }
    });
    if (isUser) return true;
  }
  if (role === 'SUPERADMIN') return true;
  return false;
}

/**
 * Retrieves all stores associated with the authenticated user.
 * @returns {Promise<Store[]>} An array of stores associated with the user.
 * @throws Will throw an error if the user is not authenticated.
 */
export async function getUserStores(): Promise<Store[]> {
  const data = await auth();
  if (!data?.user) throw new Error();
  const stores = await entities.store.findMany({
    where: {
      User: {
        some: {
          email: data.user.email as string
        }
      }
    }
  });
  return stores;
}

/**
 * Retrieves all stores.
 * @returns {Promise<Store[]>} An array of all stores.
 */
export async function getStores(): Promise<Store[]> {
  return await entities.store.findMany();
}

/**
 * Adds a new store to the database.
 * @param {Prisma.StoreCreateInput} data - The data for the new store.
 * @returns {Promise<Store>} The newly created store.
 */
export async function addStore(data: Prisma.StoreCreateInput): Promise<Store> {
  return await entities.store.create({
    data
  });
}
