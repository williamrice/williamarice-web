import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const sessionEmail = await session?.user?.email;
  const user = await prisma.user.findUnique({
    where: {
      email: sessionEmail?.toString(),
    },
  });

  return NextResponse.json(user);
};
