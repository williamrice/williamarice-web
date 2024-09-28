"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFolder, FiSettings } from "react-icons/fi";
import Signout from "./auth-helpers/Signout";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Projects", href: "/admin/project-manager", icon: FiFolder },
  { name: "Settings", href: "/admin/settings", icon: FiSettings },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <item.icon className="mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {session.data && (
          <div className="mt-8">
            <p className="text-gray-400">Signed in as:</p>
            <p className="text-white font-semibold">
              {session.data.user?.name}
            </p>
            <Signout />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
