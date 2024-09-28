import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import resumeData from "@/public/resume.json";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    // Check if a resume already exists
    const existingResume = await prisma.resume.findUnique({
      where: { id: "1" },
    });

    if (existingResume) {
      return NextResponse.json(
        { message: "Resume already seeded" },
        { status: 400 }
      );
    }

    // Convert string dates to Date objects
    //@ts-ignore
    const convertDates = (data: any) => {
      if (Array.isArray(data)) {
        //@ts-ignore
        return data.map((item) => convertDates(item));
      }
      if (typeof data === "object" && data !== null) {
        const newObj: any = {};
        for (const key in data) {
          if (key === "startDate" || key === "endDate" || key === "date") {
            newObj[key] = data[key] ? new Date(data[key]) : null;
          } else {
            newObj[key] = convertDates(data[key]);
          }
        }
        return newObj;
      }
      return data;
    };

    const convertedResumeData = convertDates(resumeData);

    // Create the resume
    const resume = await prisma.resume.create({
      data: {
        id: "1",
        name: convertedResumeData.basics.name,
        label: convertedResumeData.basics.label,
        image: convertedResumeData.basics.image,
        email: convertedResumeData.basics.email,
        phone: convertedResumeData.basics.phone,
        url: convertedResumeData.basics.url,
        summary: convertedResumeData.basics.summary,
        address: convertedResumeData.basics.location.address,
        postalCode: convertedResumeData.basics.location.postalCode,
        city: convertedResumeData.basics.location.city,
        countryCode: convertedResumeData.basics.location.countryCode,
        region: convertedResumeData.basics.location.region,
        profiles: {
          create: convertedResumeData.basics.profiles,
        },
        skills: {
          create: convertedResumeData.skills,
        },
        work: {
          create: convertedResumeData.work,
        },
        education: {
          create: convertedResumeData.education,
        },
        certificates: {
          create: convertedResumeData.certificates,
        },
        projects: {
          create: convertedResumeData.projects,
        },
        volunteer: {
          create: convertedResumeData.volunteer,
        },
        interests: {
          create: convertedResumeData.interests,
        },
      },
    });

    return NextResponse.json(
      { message: "Resume seeded successfully", resume },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding resume:", error);
    return NextResponse.json(
      { message: "Error seeding resume" },
      { status: 500 }
    );
  }
}
