import React from "react";
import Image from "next/image";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

const JumboTron = () => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-md">
      <div className="py-6 px-4 mx-auto max-w-screen-xl text-center lg:py-10">
        <div className="w-full flex justify-center mb-6">
          <Image
            alt="Profile Picture"
            src="/profile_tie.jpg"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          William Rice
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Welcome to my personal space on the web! I&apos;m just another nerd
          that enjoys software development, 3d printing, and gaming.
        </p>
        <a href="https://williamrice.github.io" target="blank">
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-8 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            View My Resume
          </button>
        </a>
      </div>
    </section>
  );
};

export default JumboTron;
