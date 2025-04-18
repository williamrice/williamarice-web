import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";
import SectionHeader from "./SectionHeader";
import SecondaryButton from "./SecondaryButton";

const FeaturedProjects = async () => {
  const projects = await getAllProjects();
  return (
    <div className="my-8 max-w-full overflow-hidden">
      <div className="flex flex-col justify-center my-4">
        <SectionHeader title="Featured Projects" />
        <div className="flex justify-center">
          <SecondaryButton text="See All Projects" link="/projects" />
        </div>
      </div>

      <div className="grid mx-2 lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-6 p-4">
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
