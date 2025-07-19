import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const data = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      isAdmin: true,
    },
  });
  return NextResponse.json({ message: "success" });
}
