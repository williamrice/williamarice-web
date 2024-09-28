import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";
import Divider from "./Divider";
import SecondaryButton from "./SecondaryButton";

const FeaturedProjects = async () => {
  const projects = await getAllProjects();
  return (
    <div className="my-8 max-w-full overflow-hidden">
      <div className="flex flex-col justify-center my-4">
        <h2 className="text-4xl font-bold">Featured Projects</h2>
        <Divider />
        <div className="flex justify-center">
          <Link href={"/projects"}>
            <SecondaryButton text="See All Projects" link="/projects" />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm-grid-cols-1 gap-2">
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
