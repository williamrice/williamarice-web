"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Signout = () => {
  return (
    <button
      className="bg-gray-400 hover:bg-gray-600 rounded-md text-white px-4 py-2 mt-4"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default Signout;
