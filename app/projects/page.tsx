import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProjectCard from "../../components/ProjectCard";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

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
          Project Portfolio
        </h1>
      </Header>

      {/* Project Description */}
      <div className="mx-auto px-4 py-8">
        <div className="p-6 rounded-lg ">
          <h2 className="text-2xl font-semibold mb-3 text-center">
            My Projects
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Here are some of the projects I&apos;ve completed or worked on
            outside of work. Feel free to check out more of my work on my{" "}
            <a
              href="https://github.com/williamarice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>

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
