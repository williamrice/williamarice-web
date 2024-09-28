"use client";

import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { deleteProject } from "@/actions/projects";
import { useRouter, useSearchParams } from "next/navigation";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects: initialProjects,
}: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const result = await deleteProject(id);
      if (result.success) {
        setProjects(projects.filter((project) => project.id !== id));
        router.refresh();
      } else {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Success/Error Banner */}
      {success === "true" && (
        <div className="bg-green-500 text-white p-4 text-center">
          Project successfully added!
        </div>
      )}
      {success === "false" && (
        <div className="bg-red-500 text-white p-4 text-center">
          Failed to add project. Please try again.
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Featured
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">{project.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {project.featured ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/project-manager/edit/${project.id}`}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
