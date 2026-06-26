import { redirect } from "next/navigation";
import AddProjectForm from "../../../components/AddProjectForm";
import { getAllowedAdminSession } from "@/lib/auth-guards";

export default async function AddProjectPage() {
  const session = await getAllowedAdminSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <AddProjectForm />
    </div>
  );
}
