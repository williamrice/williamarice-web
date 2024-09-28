import { getAllProjects } from "@/actions/projects";
import ProjectList from "./ProjectList";
import AddProjectButton from "@/components/AddProjectButton";

export default async function ProjectManagerPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto mt-12 px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Project Manager</h1>
        <AddProjectButton />
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
