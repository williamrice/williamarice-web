import prisma from "@/lib/prisma";
import { getAllowedAdminSession } from "@/lib/auth-guards";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getAllowedAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
      { status: 500 },
    );
  }
}
