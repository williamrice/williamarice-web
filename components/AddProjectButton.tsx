"use client";

import Link from "next/link";
import React from "react";

const AddProjectButton = () => {
  return (
    <Link
      role="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      href="/admin/add-project"
    >
      Add Project
    </Link>
  );
};

export default AddProjectButton;
