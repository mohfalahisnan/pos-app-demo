"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUser(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;
  const user = await currentUser();
  if (!user) return false;

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.emailAddresses[0].emailAddress ?? "",
        role: "USER",
        imageUrl: user.imageUrl,
      },
    });
  }

  return true;
}

export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;
  const user = await currentUser();
  if (!user) return false;

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) return false;
  if (dbUser.role === "ADMIN" || dbUser.role === "SUPERADMIN") return true;
  return false;
}
