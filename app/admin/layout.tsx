import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Signin from "@/components/auth-helpers/Signin";
import { authOptions } from "../lib/authOptions";
import Signout from "@/components/auth-helpers/Signout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Signin />
      </div>
    );
  }

  if (!session.user?.isAdmin) {
    return (
      <div>
        <p>You are not authorized to access this page</p>
        <Signout />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
