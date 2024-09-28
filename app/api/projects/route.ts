import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const { galleryImages, ...projectData } = data;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        galleryImages: {
          create: galleryImages.map((image: { imagePath: string }) => ({
            imagePath: image.imagePath,
          })),
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
