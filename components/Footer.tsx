import React from "react";

import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <footer className="inset-x-0 bottom-0 z-20 h-[150px] w-full p-4 bg-white border-t border-gray-500 shadow-xl md:flex-col md:items-center md:justify-center md:p-6">
      <div className="flex justify-center gap-4 mb-2">
        <SocialLinks />
      </div>
      <ul className="flex flex-wrap justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 mb-2">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            About
          </a>
        </li>
        <li>
          <a href="/privacy-policy" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="/licensing" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="/secret-message" className="mr-4 hover:underline md:mr-6">
            Secret
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
      <div className="flex justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://www.williamarice.com" className="hover:underline">
            William Rice
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
