import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";
import { redirect } from "next/navigation";
import AddProjectForm from "../../../components/AddProjectForm";

export default async function AddProjectPage() {
  const session = await getServerSession(authOptions);

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
