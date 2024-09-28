import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProjectCard from "../../components/ProjectCard";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";
import Header from "@/components/Header";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const success = searchParams.success;
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          My Projects
        </h1>
      </Header>

      {/* Projects Grid */}
      <main className=" mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
