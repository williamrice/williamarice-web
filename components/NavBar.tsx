"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Code2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Header with Icon on the Left and Hamburger Menu on the Right */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        {/* Left Icon */}

        <span
          className="flex gap-1 items-center ml-2 text-lg font-semibold text-gray-800"
          onClick={() => router.push("/")}
        >
          <Code2Icon size={40} />
          William Rice
        </span>

        {/* Hamburger Icon */}
        <button
          className="md:hidden p-2 focus:outline-none focus:ring"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:bg-transparent md:flex md:items-center md:justify-between md:w-full`}
      >
        <div className="relative w-64 md:w-auto bg-white md:bg-transparent h-full md:h-auto ml-auto">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 md:hidden p-2 focus:outline-none focus:ring"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="flex flex-col items-start p-4 md:flex-row md:space-x-6 md:p-0 md:items-center w-full h-full">
            <a
              href="#"
              className="block px-2 py-2 mt-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-gray-900"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-2 py-2 mt-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="block px-2 py-2 mt-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-gray-900"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-2 py-2 mt-2 text-sm font-semibold text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-gray-900"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
