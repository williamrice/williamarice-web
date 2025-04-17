import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { ResumeType } from "@/app/types/resume";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export async function GET(): Promise<
  NextResponse<ResumeType | { error: string }>
> {
  try {
    const resume = await prisma.resume.findFirst({
      include: {
        profiles: true,
        skills: true,
        work: {
          orderBy: {
            id: "asc",
          },
        },
        education: true,
        certificates: true,
        projects: true,
        volunteer: true,
        interests: true,
      },
    });
    return NextResponse.json(resume as ResumeType, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
