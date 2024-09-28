"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface MainButtonProps {
  text: string;
  link: string;
}

const MainButton = ({ text, link }: MainButtonProps) => {
  const router = useRouter();
  return (
    <Button
      className="mt-4 bg-white text-black hover:bg-white hover:scale-110 transition-all ease-in-out hover:text-black"
      onClick={() => {
        router.push(link);
      }}
    >
      {text}
    </Button>
  );
};

export default MainButton;
