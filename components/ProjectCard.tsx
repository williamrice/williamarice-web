"use client";

import { Project } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import TechnologyPill from "./TechnologyPill";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  return (
    <div
      key={project.id}
      className="p-4 w-full space-y-2 shadow-md rounded-md border-2 border-gray-300 cursor-pointer transition-all ease-in-out hover:scale-105 hover:shadow-2xl transform-gpu"
      style={{ transformOrigin: "center" }}
      onClick={() => {
        router.push(`/projects/${project.id}`);
      }}
    >
      <div className="w-full flex justify-center min-h-[300px]">
        <Image
          src={project.featuredImageSrc}
          alt={project.featuredImageAlt}
          className="rounded-md"
          width={600}
          height={600}
          unoptimized={true}
        />
      </div>
      <div>
        <h2 className="text-3xl flex justify-center items-center font-bold m-4 text-center min-h-[100px]">
          {project.title}
        </h2>
        <div className="flex justify-center m-2">
          {project.technologies.map((technology) => {
            return <TechnologyPill key={technology} technology={technology} />;
          })}
        </div>
      </div>
      <div className="my-2 p-2 min-h-[150px]">
        <p className="text-left">{project.description}</p>
      </div>
      <div className="flex justify-center gap-2 m-2">
        {project.githubUrl !== "" && project.githubUrl !== null ? (
          <Link
            href={project.githubUrl}
            target="_blank"
            className="hover:scale-110 transition-all ease-in-out text-left font-bold flex justify-center items-center bg-black text-white p-4 gap-1 rounded-md"
          >
            <AiFillGithub className="inline-block" />
            View Github
          </Link>
        ) : null}
        {project.liveUrl !== "" ? (
          <Link
            href={project.liveUrl ? project.liveUrl : "#"}
            target="_blank"
            className="hover:scale-110 transition-all ease-in-out text-left font-bold flex justify-center items-center border-2 border-gray-500 p-4 gap-1 rounded-md"
          >
            <AiFillEye className="inline-block" />
            View Live
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
