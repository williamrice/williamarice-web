import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import ProjectCard from "./ProjectCard";

const dummyProjectData = [
  {
    id: 1,
    title: "Project 1",
    featured: true,
    githubUrl: "www.github.com",
    liveUrl: "www.github.com",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    problem:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    solution:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    technologies: ["Typescript", "Next.js", "Tailwind CSS"],
    featuredImageSrc: "/images/project-1/project_1_sample.jpg",
    featuredImageAlt: "Project 1 image",
  },
  {
    id: 2,
    title: "Project 2",
    featured: true,
    githubUrl: "www.github.com",
    liveUrl: "www.github.com",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    problem:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    solution:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    technologies: ["Typescript", "Next.js", "Tailwind CSS"],
    featuredImageSrc: "/images/project-1/project_1_sample.jpg",
    featuredImageAlt: "Project 1 image",
  },
  {
    id: 3,
    title: "Project 3",
    featured: true,
    githubUrl: "www.github.com",
    liveUrl: "www.github.com",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    problem:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    solution:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Felis nulla aenean commodo porta ultrices habitant inceptos suspendisse rutrum. Senectus eros ridiculus platea massa elementum ex curae blandit nam. Penatibus mollis tortor ridiculus; laoreet praesent euismod laoreet. Cubilia mi dui maximus; conubia urna proin aliquam. Adipiscing nullam eleifend vitae metus nostra neque.",
    technologies: ["Typescript", "Next.js", "Tailwind CSS"],
    featuredImageSrc: "/images/project-1/project_1_sample.jpg",
    featuredImageAlt: "Project 1 image",
  },
];

const FeaturedProjects = () => {
  return (
    <div>
      <div className="flex justify-center m-4">
        <h1 className="text-3xl font-bold">Featured Projects</h1>
      </div>

      {dummyProjectData.map((project) => {
        if (!project.featured) {
          return null;
        }
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
};

export default FeaturedProjects;
