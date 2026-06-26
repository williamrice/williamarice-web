import prisma from "@/lib/prisma";
import { getAllowedAdminSession } from "@/lib/auth-guards";
import { isAllowedAuthEmail } from "@/lib/auth-allowlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getAllowedAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!isAllowedAuthEmail(data.email)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

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
