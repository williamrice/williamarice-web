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
