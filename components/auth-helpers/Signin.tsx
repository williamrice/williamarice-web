"use client";

import {authClient} from "@/lib/auth-client";
import {FaGoogle} from "react-icons/fa";

const handleSignIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/admin",
    });
};

const Signin = () => {
    return (
        <button
            onClick={handleSignIn}
            className="bg-blue-500 transition ease-in-out hover:scale-105 hover:cursor-pointer rounded-md p-3"
        >
            <span className="mr-2 text-white text-lg">Sign In with Google</span>
            <FaGoogle className="text-white inline"/>
        </button>
    );
};

export default Signin;
