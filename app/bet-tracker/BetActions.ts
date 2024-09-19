"use server";

import { Bet, Status, PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FileWatcherEventKind } from "typescript";

const prisma = new PrismaClient();

export interface BetParams {
  id?: string;
  amountBet: number;
  amountWon: number;
  date: Date;
  status: Status;
  description: string;
}

export async function createBet(betData: BetParams) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const bet: Bet = {
    id: crypto.randomUUID(),
    userId: user?.id,
    amountBet: new Prisma.Decimal(betData.amountBet),
    amountWon: new Prisma.Decimal(betData.amountWon),
    date: betData.date,
    status: betData.status,
    description: betData.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await prisma.bet.create({ data: bet });

  if (!result) {
    throw new Error("Failed to create bet");
  }
  revalidatePath("/bet-tracker");
  return true;
}

export async function getBets(email: string | null | undefined) {
  if (!email) {
    throw new Error("User not authenticated");
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const bets = await prisma.bet.findMany({
    where: {
      userId: user?.id,
    },
  });
  return bets;
}

export async function deleteBet(id: string) {
  const result = await prisma.bet.delete({
    where: {
      id,
    },
  });
  if (!result) {
    throw new Error("Failed to delete bet");
  }
  revalidatePath("/bet-tracker");
  return true;
}

export async function updateBet(betData: BetParams) {
  const result = await prisma.bet.update({
    where: {
      id: betData.id,
    },
    data: betData,
  });
  if (!result) {
    throw new Error("Failed to update bet");
  }
  revalidatePath("/bet-tracker");
  return true;
}
