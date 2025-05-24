"use client";
import { Project } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

interface FeaturedProjectCardProps {
  project: Project;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
}) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={project.featuredImageSrc}
          alt={project.featuredImageAlt}
          fill
          className="object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">{project.title}</h3>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-medium bg-blue-800 text-white rounded-full border border-blue-600"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-8 text-center h-[12rem] relative overflow-hidden">
          <div className="text-gray-300 text-lg leading-relaxed line-clamp-5">
            {project.description}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <span className="inline-flex items-center justify-center w-full px-5 py-3 rounded-lg bg-blue-700 text-white font-medium shadow-md hover:bg-blue-800 transition-all duration-300">
            <AiFillEye className="mr-2 h-5 w-5" />
            View Case Study
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedProjectCard;
