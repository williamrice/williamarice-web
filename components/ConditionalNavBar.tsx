"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";

export default function ConditionalNavBar() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return <Navbar />;
}
