import React from "react";
import Link from "next/link";
import { AiOutlineMail, AiOutlineFilePdf } from "react-icons/ai";

const CallToAction = () => {
  return (
    <div className="relative w-full py-24 overflow-hidden mb-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900"></div>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gray-600 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "20px 20px",
        }}
      ></div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {" "}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Let's connect and collaborate!
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-blue-100 mb-8">
            I&apos;m always open to new opportunities, collaborations, and
            connecting with fellow developers. Let&apos;s build something
            amazing together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-blue-900 font-semibold shadow-lg hover:bg-blue-50 transition-colors duration-300"
            >
              <AiOutlineMail className="mr-2 h-5 w-5" />
              Contact Me
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center px-8 py-4 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              <AiOutlineFilePdf className="mr-2 h-5 w-5" />
              View Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
