import React from "react";
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header>
        <div className="h-full flex flex-col items-center justify-center animate-slideDown">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            Project Portfolio
          </h1>
        </div>
      </Header>

      {/* Project Description */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">My Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse through my project portfolio below. Each project includes a
            detailed case study covering the problem, solution, and development
            process. Click on any project to explore the full story behind it.
            You can also check out more of my work on my{" "}
            <a
              href="https://github.com/williamrice"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {/* Projects Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
