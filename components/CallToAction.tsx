import React from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
import { Divide } from "lucide-react";
import Divider from "./Divider";

const CallToAction = () => {
  return (
    <div className="bg-gray-500 flex  flex-col justify-center gap-2 p-8 w-full">
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-5xl text-white font-bold">Get in touch</h2>
        <p className="text-gray-300 align-text-bottom">
          I am always looking for new opportunities
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <MainButton text="Contact Me" link="/contact" />
        <SecondaryButton text="Resume" link="/resume" />
      </div>
    </div>
  );
};

export default CallToAction;
