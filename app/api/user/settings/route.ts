import { authOptions } from "@/app/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const data = await req.json();

  //get the user from next auth
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });

  //update the user settings if exists otherwise create a user settings record
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (userSettings) {
    await prisma.userSettings.update({
      where: {
        userId: user?.id,
      },
      data: {
        theme: data.theme,
      },
    });
  } else {
    await prisma.userSettings.create({
      data: {
        theme: data.theme,
        userId: user!.id, // Use non-null assertion operator to assert that user?.id is not undefined
      },
    });
  }
  return NextResponse.json({ message: "success" });
}

export async function GET(req: NextRequest, res: NextResponse) {
  const prisma = new PrismaClient();
  const data = await req.json();
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
