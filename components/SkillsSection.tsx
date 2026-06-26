import React from "react";
import "devicon/devicon.min.css";
import Link from "next/link";
import { Skill } from "@/lib/types";
import { SkillCategory } from "./SkillCategory";

const frontend: Skill[] = [
  {
    name: "React",
    iconClass: "devicon-react-original colored",
  },
  {
    name: "CSS",
    iconClass: "devicon-css3-plain colored",
  },
  {
    name: "HTML",
    iconClass: "devicon-html5-plain colored",
  },
  {
    name: "Astro",
    iconClass: "devicon-astro-plain-wordmark colored",
  },
  {
    name: "Next.js",
    iconClass: "devicon-nextjs-plain colored",
  },
  {
    name: "Tailwind CSS",
    iconClass: "devicon-tailwindcss-plain colored",
  },
  {
    name: "Blazor",
    iconClass: "devicon-blazor-original colored",
  },
];

const backend: Skill[] = [
  {
    name: "Node.js",
    iconClass: "devicon-nodejs-plain colored",
  },
  {
    name: "Symfony",
    iconClass: "devicon-symfony-original",
  },
  {
    name: "Laravel",
    iconClass: "devicon-laravel-original colored",
  },
  {
    name: "MySQL",
    iconClass: "devicon-mysql-plain colored",
  },
  {
    name: "PostgreSQL",
    iconClass: "devicon-postgresql-plain colored",
  },
  {
    name: "ASP.NET",
    iconClass: "devicon-dotnetcore-plain colored",
  },
  {
    name: "WordPress",
    iconClass: "devicon-wordpress-plain colored",
  },
];

const languages: Skill[] = [
  {
    name: "TS",
    iconClass: "devicon-typescript-plain colored",
  },
  {
    name: "JS",
    iconClass: "devicon-javascript-plain colored",
  },
  {
    name: "PHP",
    iconClass: "devicon-php-plain colored",
  },
  {
    name: "C#",
    iconClass: "devicon-csharp-plain colored",
  },
  {
    name: "Python",
    iconClass: "devicon-python-plain colored",
  },
  {
    name: "C++",
    iconClass: "devicon-cplusplus-plain colored",
  },
  {
    name: "Bash",
    iconClass: "devicon-bash-plain",
  },
  {
    name: "Lua",
    iconClass: "devicon-lua-plain colored",
  },
];

const tools: Skill[] = [
  {
    name: "Docker",
    iconClass: "devicon-docker-plain colored",
  },
  {
    name: "Linux",
    iconClass: "devicon-linux-plain colored",
  },
  {
    name: "Git",
    iconClass: "devicon-git-plain colored",
  },
  {
    name: "GitHub",
    iconClass: "devicon-github-original colored",
  },
  {
    name: "AWS",
    iconClass: "devicon-amazonwebservices-plain-wordmark colored",
  },
  {
    name: "Oracle",
    iconClass: "devicon-oracle-original colored",
  },
  {
    name: "Azure",
    iconClass: "devicon-azure-plain colored",
  },
];

const SkillsSection = () => {
  return (
    <div className="w-full py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            My Technical Skills
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            I&apos;ve worked with a wide range of technologies. Here are some of
            my skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SkillCategory title="Frontend" skills={frontend} />
          <SkillCategory title="Backend" skills={backend} />
          <SkillCategory title="Languages" skills={languages} />
          <SkillCategory title="Tools" skills={tools} />
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/credentials"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-colors duration-300 group"
          >
            <span>View My Credentials</span>
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
