import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";

const FeaturedProjects = async () => {
  const projects = await getAllProjects();
  return (
    <div>
      <div className="flex justify-center m-4">
        <h1 className="text-3xl font-bold">Featured Projects</h1>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-4">
        {projects.map((project: Project) => {
          if (!project.featured) {
            return null;
          }
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedProjects;
