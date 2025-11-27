import React from "react";
import "devicon/devicon.min.css";
import Link from "next/link";
import { Skill } from "@/lib/types";
import { SkillCategory } from "./SkillCategory";

const skills: Skill[] = [
  {
    name: "TypeScript",
    iconClass: "devicon-typescript-plain colored",
    category: "language",
  },
  {
    name: "React",
    iconClass: "devicon-react-original colored",
    category: "frontend",
  },
  {
    name: "JavaScript",
    iconClass: "devicon-javascript-plain colored",
    category: "language",
  },
  {
    name: "CSS",
    iconClass: "devicon-css3-plain colored",
    category: "frontend",
  },
  {
    name: "HTML",
    iconClass: "devicon-html5-plain colored",
    category: "frontend",
  },
  {
    name: "Docker",
    iconClass: "devicon-docker-plain colored",
    category: "tool",
  },
  {
    name: "Astro",
    iconClass: "devicon-astro-plain-wordmark colored",
    category: "frontend",
  },
  { name: "PHP", iconClass: "devicon-php-plain colored", category: "language" },
  {
    name: "C#",
    iconClass: "devicon-csharp-plain colored",
    category: "language",
  },
  {
    name: "Python",
    iconClass: "devicon-python-plain colored",
    category: "language",
  },
  { name: "Linux", iconClass: "devicon-linux-plain colored", category: "tool" },
  {
    name: "C++",
    iconClass: "devicon-cplusplus-plain colored",
    category: "language",
  },
  {
    name: "Java",
    iconClass: "devicon-java-plain colored",
    category: "language",
  },
  {
    name: "Lua",
    iconClass: "devicon-lua-plain colored",
    category: "language",
  },
  {
    name: "Next.js",
    iconClass: "devicon-nextjs-plain colored",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    iconClass: "devicon-tailwindcss-plain colored",
    category: "frontend",
  },
  {
    name: "Node.js",
    iconClass: "devicon-nodejs-plain colored",
    category: "backend",
  },
  {
    name: "MongoDB",
    iconClass: "devicon-mongodb-plain colored",
    category: "backend",
  },
  {
    name: "MySQL",
    iconClass: "devicon-mysql-plain colored",
    category: "backend",
  },
  {
    name: "PostgreSQL",
    iconClass: "devicon-postgresql-plain colored",
    category: "backend",
  },
  {
    name: "Java Spring",
    iconClass: "devicon-spring-plain colored",
    category: "backend",
  },
  {
    name: "ASP.NET",
    iconClass: "devicon-dotnetcore-plain colored",
    category: "backend",
  },
  {
    name: "WordPress",
    iconClass: "devicon-wordpress-plain colored",
    category: "backend",
  },
  { name: "Git", iconClass: "devicon-git-plain colored", category: "tool" },
  {
    name: "GitHub",
    iconClass: "devicon-github-original colored",
    category: "tool",
  },
  {
    name: "AWS",
    iconClass: "devicon-amazonwebservices-plain-wordmark colored",
    category: "tool",
  },
];

const SkillsSection = () => {
  // Group skills by category
  const categories = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    language: skills.filter((skill) => skill.category === "language"),
    tool: skills.filter((skill) => skill.category === "tool"),
  };

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
          <SkillCategory title="Frontend" skills={categories.frontend} />
          <SkillCategory title="Backend" skills={categories.backend} />
          <SkillCategory title="Languages" skills={categories.language} />
          <SkillCategory title="Tools" skills={categories.tool} />
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
