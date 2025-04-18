import React from "react";
import "devicon/devicon.min.css";
import Link from "next/link";
import SectionHeader from "./SectionHeader";

interface Skill {
  name: string;
  iconClass: string;
}

const skills: Skill[] = [
  { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
  { name: "React", iconClass: "devicon-react-original colored" },
  { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { name: "CSS", iconClass: "devicon-css3-plain colored" },
  { name: "HTML", iconClass: "devicon-html5-plain colored" },
  { name: "Docker", iconClass: "devicon-docker-plain colored" },
  { name: "Astro", iconClass: "devicon-astro-plain-wordmark colored" },
  { name: "PHP", iconClass: "devicon-php-plain colored" },
  { name: "C#", iconClass: "devicon-csharp-plain colored" },
  { name: "Python", iconClass: "devicon-python-plain colored" },
  { name: "Linux", iconClass: "devicon-linux-plain colored" },
  { name: "C++", iconClass: "devicon-cplusplus-plain colored" },
  { name: "Java", iconClass: "devicon-java-plain colored" },
  { name: "Next.js", iconClass: "devicon-nextjs-plain colored" },
  { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-plain colored" },
  { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
  { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
  { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
  { name: "PostgreSQL", iconClass: "devicon-postgresql-plain colored" },
  { name: "Git", iconClass: "devicon-git-plain colored" },
  { name: "GitHub", iconClass: "devicon-github-original colored" },
];

const SkillsSection = () => {
  // shuffle the skills array
  const shuffledSkills = skills.sort(() => 0.5 - Math.random());
  return (
    <div className="bg-gray-200 flex flex-col justify-center items-center w-full px-4 py-8 mb-8">
      <SectionHeader title="Skills" />
      <div className="flex flex-wrap max-w-6xl justify-center">
        {shuffledSkills.map((skill, index) => (
          <div
            key={skill.name}
            className="m-4 text-center"
            style={{
              transform: `translate(${Math.random() * 20 - 10}px, ${
                Math.random() * 20 - 10
              }px)`,
            }}
          >
            <i className={`${skill.iconClass} text-5xl mb-2`}></i>
            <p className="text-sm">{skill.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/credentials"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md"
        >
          View My Credentials
        </Link>
      </div>
    </div>
  );
};

export default SkillsSection;
