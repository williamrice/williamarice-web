import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import AdminSidebar from "@/components/AdminSidebar";
import Signin from "@/components/auth-helpers/Signin";
import Signout from "@/components/auth-helpers/Signout";

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="bg-blue-black-gradient flex justify-center items-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-2 justify-center items-center">
                    <h2 className="text-2xl font-bold">Sign In</h2>
                    <p>This website doesn't currently support registering or signing in with user accounts. The sign-in
                        button below is for
                        the
                        web administrator only. </p>
                    <Signin/>
                </div>
            </div>
        );
    }

    if (!session.user?.isAdmin) {
        return (
            <div>
                <p>You are not authorized to access this page</p>
                <Signout/>
            </div>
        );
    }

    return (
        <div className="flex">
            <AdminSidebar/>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
