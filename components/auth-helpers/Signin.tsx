"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const Signin = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/admin" })}
      className="bg-gray-400 hover:bg-gray-600 rounded-md p-3"
    >
      <span className="mr-2 text-white text-lg">Sign In with Google</span>
      <FaGoogle className="text-white inline" />
    </button>
  );
};

export default Signin;
