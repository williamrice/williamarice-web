"use client";

import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

const handleSignIn = async () => {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
  });
};

const Signin = () => {
  return (
    <button
      onClick={handleSignIn}
      className="bg-gray-400 hover:bg-gray-600 rounded-md p-3"
    >
      <span className="mr-2 text-white text-lg">Sign In with Google</span>
      <FaGoogle className="text-white inline" />
    </button>
  );
};

export default Signin;
