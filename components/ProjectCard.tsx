"use client";

import { Project } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import TechnologyPill from "./TechnologyPill";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle click on description
  const handleDescriptionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from triggering
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      key={project.id}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      onClick={() => {
        router.push(`/projects/${project.id}`);
      }}
    >
      <div className="relative h-[300px] w-full overflow-hidden border-b-2 border-white">
        <Image
          src={project.featuredImageSrc}
          alt={project.featuredImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform hover:scale-105 transition-transform duration-500"
          unoptimized={true}
        />
      </div>
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-6 min-h-16">
          {project.title}
        </h2>
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {project.technologies.slice(0, 3).map((technology) => {
            return <TechnologyPill key={technology} technology={technology} />;
          })}
          {project.technologies.length > 3 && (
            <TechnologyPill
              key={`more-${project.id}`}
              technology={`+${project.technologies.length - 3} more`}
            />
          )}
        </div>
        <div className="mb-8 text-center h-48 relative overflow-hidden">
          <div
            className="text-gray-300 text-lg leading-relaxed h-full"
            onClick={handleDescriptionClick}
          >
            <div
              className={`${isExpanded ? "h-full overflow-y-auto pb-10" : "line-clamp-3"}`}
            >
              {project.description}
            </div>

            {project.description.length > 150 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-blue-400 hover:underline block mt-2 mx-auto absolute bottom-0 left-0 right-0"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>

        {/* Prominent View Case Study button */}
        <div className="mb-6">
          <button
            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-lg bg-blue-700 text-white font-medium shadow-md hover:bg-blue-800 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/projects/${project.id}`);
            }}
          >
            <AiFillEye className="mr-2 h-5 w-5" />
            View Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
