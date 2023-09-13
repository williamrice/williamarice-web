import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const data = await req.json();
  console.log(data);
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  prisma.userSettings.update({
    where: {
      userId: user?.id,
    },
    data: {
      theme: data.theme,
    },
  });
  return NextResponse.json({ message: "success" });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const data = await req.json();
  console.log(data);
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user?.id,
    },
  });
  return NextResponse.json(userSettings);
}
