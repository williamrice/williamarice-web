"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface SecondaryButtonProps {
  text: string;
  link: string;
}

const SecondaryButton = ({ text, link }: SecondaryButtonProps) => {
  const router = useRouter();
  return (
    <Button
      className="mt-4 bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 transition-all ease-in-out hover:text-white"
      onClick={() => {
        router.push(link);
      }}
    >
      {text}
    </Button>
  );
};

export default SecondaryButton;
