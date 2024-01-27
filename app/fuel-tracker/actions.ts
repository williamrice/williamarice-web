"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Dispatch, SetStateAction } from "react";

const prisma = new PrismaClient();

type FuelTransaction = {
  amount: number;
  date: Date;
};

export async function createFuelTransaction(values: FuelTransaction) {
  const user = await getServerSession();
  if (!user) {
    return {
      success: false,
    };
  }
  const result = await prisma.user.update({
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
  return { ...result, success: true };
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

export async function deleteFuelTransactionById(transactionId: string) {
  const user = await getServerSession();
  if (!user) {
    return false;
  }
  try {
    await prisma.user.update({
      where: {
        email: user?.user?.email as string,
      },
      data: {
        fuelTransactions: {
          delete: {
            id: transactionId,
          },
        },
      },
    });
  } catch (err) {
    return false;
  }
  revalidatePath("/fuel-tracker");
  return true;
}
