import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });
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

export async function GET(req: NextRequest) {
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
