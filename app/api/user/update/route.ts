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
  console.log(user);
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
