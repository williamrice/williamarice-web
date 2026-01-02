"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Code } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "Credentials", href: "/credentials" },
  { name: "Contact", href: "/contact" },
];

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const router = useRouter();
  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 transition-all duration-300 ${
        isScrolled ? "h-16 bg-blue-600" : "h-20 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <motion.button
        className="text-white font-bold text-xl cursor-pointer bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-white rounded p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          router.push("/");
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            router.push("/");
          }
        }}
        aria-label="Go to home page"
      >
        William Rice
      </motion.button>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="text-white hover:bg-transparent hover:text-white hover:scale-120 transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          aria-label="Mobile navigation menu"
          className="w-full sm:w-[400px] bg-gray-900/95 backdrop-blur-sm border-gray-700 flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full">
              <Code className="w-16 h-16 text-white" />
            </div>
            <nav
              aria-label="Mobile navigation links"
              className="flex flex-col space-y-4"
            >
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={`${item.href.toLowerCase()}`}
                  className="text-white text-2xl font-semibold text-center hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};

export default NavBar;
