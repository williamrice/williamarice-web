import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import HeaderTypeAnimation from "./header-type-animation";

const JumboTron = () => {
  return (
    <section className="bg-[url('/images/header.jpg')] bg-center bg-cover bg-no-repeat rounded-md min-h-[400px] w-full">
      <div className="lg:grid lg:grid-cols-2 min-h-[600px] flex justify-center items-center">
        <div className=" h-full  lg:col-span-1 flex flex-col items-center justify-center">
          <Image
            src="/images/william_rice-headshot.png"
            width={200}
            height={200}
            alt="William Rice"
          />
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            William Rice
          </h1>
          <HeaderTypeAnimation />
        </div>
        <div className="lg:col-span-1"></div>
      </div>
    </section>
  );
};

export default JumboTron;
