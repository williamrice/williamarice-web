import React from "react";
import Image from "next/image";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import HeaderTypeAnimation from "./header-type-animation";
import MainButton from "./MainButton";
import Header from "./Header";

const JumboTron = () => {
  return (
    <Header height="600px">
      <div className=" h-full flex flex-col items-center justify-center">
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
        <MainButton text="Contact Me" link="/contact" />
      </div>
      <div className="lg:col-span-1"></div>
    </Header>
  );
};

export default JumboTron;
