import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import MainButton from "./MainButton";

const JumboTron = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[85vh] bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center h-full py-20 px-4 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 w-full">
          {/* Image shown first on mobile, second on desktop */}
          <div className="md:w-1/2 md:order-2 flex justify-center md:justify-end mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-gray-700 rounded-full blur-md transform scale-105 animate-pulse"></div>
              <Image
                src="/images/william_rice-headshot.png"
                width={280}
                height={280}
                alt="William Rice"
                className="relative rounded-full border-4 border-white shadow-lg md:w-[400px] md:h-[400px] w-[250px] h-[250px]"
                priority
              />
            </div>
          </div>

          {/* Text content shown second on mobile, first on desktop */}
          <div className="md:w-1/2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              William Rice
            </h1>
            <div className="h-16">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Software Developer
              </h3>
            </div>
            <p className="text-lg text-gray-200 mt-2 mb-8 max-w-xl">
              Building modern, accessible, and performant software with a focus
              on user experience.
            </p>
            <div className="flex gap-4">
              <MainButton text="View Projects" link="/projects" />
              <a
                href="/resume"
                className="px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 rounded-lg transition-all duration-300 font-medium"
              >
                View Resume
              </a>
            </div>
            <div className="flex mt-8 gap-6">
              <a
                href="https://github.com/williamrice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/williamarice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/williamarice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumboTron;
