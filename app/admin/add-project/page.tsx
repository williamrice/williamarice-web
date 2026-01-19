import { redirect } from "next/navigation";
import AddProjectForm from "../../../components/AddProjectForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AddProjectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (
    !session ||
    !session.user?.email ||
    session.user.email !== "william.rice192@gmail.com"
  ) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <AddProjectForm />
    </div>
  );
}
