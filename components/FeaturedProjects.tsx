import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Project } from "@prisma/client";
import { getAllProjects } from "@/actions/projects";
import FeaturedProjectCard from "./FeaturedProjectCard";

const FeaturedProjects = async () => {
  const projects = await getAllProjects();
  const featuredProjects = projects.filter(
    (project: Project) => project.featured
  );

  return (
    <div className="w-full py-24 bg-gray-900 -mt-1">
      {" "}
      {/* Added -mt-1 to fix the gap */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Take a look at some of my recent work. Each project showcases
            different technologies and solutions.
          </p>
        </div>
        <div className="text-center mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 group"
          >
            <span>View All Projects</span>
            <AiOutlineArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="space-y-16">
          {featuredProjects.map((project: Project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
