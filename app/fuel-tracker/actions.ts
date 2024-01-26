"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

type FuelTransaction = {
  amount: number;
  date: Date;
};

export async function createFuelTransaction(values: FuelTransaction) {
  const user = await getServerSession();
  if (!user) {
    return false;
  }
  await prisma.user.update({
    where: {
      email: user?.user?.email as string,
    },
    data: {
      fuelTransactions: {
        create: {
          amount: values.amount,
          date: values.date,
        },
      },
    },
  });
  revalidatePath("/fuel-tracker");
  return true;
}

export async function getFuelTransactions() {
  const user = await getServerSession();
  if (!user) {
    return [];
  }
  const fuelTransactions = await prisma.user.findUnique({
    where: {
      email: user?.user?.email as string,
    },
    include: {
      fuelTransactions: true,
    },
  });
  return fuelTransactions?.fuelTransactions;
}

export async function deleteFuelTransactions() {
  const user = await getServerSession();
  if (!user) {
    return false;
  }
  await prisma.user.update({
    where: {
      email: user?.user?.email as string,
    },
    data: {
      fuelTransactions: {
        deleteMany: {},
      },
    },
  });
  revalidatePath("/fuel-tracker");
  return true;
}
