import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { ResumeType } from "@/app/types/resume";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request
): Promise<NextResponse<ResumeType | { error: string }>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await request.json()) as ResumeType;
    const updatedResume = await prisma.resume.update({
      where: { id: "1" },
      data: {
        ...data,
        profiles: {
          deleteMany: {},
          create: data.profiles,
        },
        skills: {
          deleteMany: {},
          create: data.skills,
        },
        work: {
          deleteMany: {},
          create: data.work,
        },
        education: {
          deleteMany: {},
          create: data.education,
        },
        certificates: {
          deleteMany: {},
          create: data.certificates,
        },
        projects: {
          deleteMany: {},
          create: data.projects,
        },
        volunteer: {
          deleteMany: {},
          create: data.volunteer,
        },
        interests: {
          deleteMany: {},
          create: data.interests,
        },
      },
      include: {
        profiles: true,
        skills: true,
        work: true,
        education: true,
        certificates: true,
        projects: true,
        volunteer: true,
        interests: true,
      },
    });
    revalidatePath("/admin/resume");
    revalidatePath("/resume");
    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
