import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";
import { ResumeType } from "@/app/types/resume";

export async function GET(): Promise<
  NextResponse<ResumeType | { error: string }>
> {
  try {
    const resume = await prisma.resume.findFirst({
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
    return NextResponse.json(resume as ResumeType);
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
