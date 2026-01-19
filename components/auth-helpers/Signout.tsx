"use client";
import { authClient } from "@/lib/auth-client";

const Signout = () => {
  return (
    <button
      className="bg-gray-400 hover:bg-gray-600 rounded-md text-white px-4 py-2 mt-4"
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              window.location.href = "/";
            },
          },
        })
      }
    >
      Sign Out
    </button>
  );
};

export default Signout;
