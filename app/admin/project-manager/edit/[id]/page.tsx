import { getProjectById } from "@/actions/projects";
import EditProjectForm from "./EditProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  console.log(typeof params);
  const { id } = await params;

  const projectId = parseInt(id);

  const project = await getProjectById(projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Project: {project.title}</h1>
      <EditProjectForm project={project} />
    </div>
  );
}
