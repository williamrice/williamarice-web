import React from "react";

import SocialLinks from "./SocialLinks";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="inset-x-0 bottom-0 z-20 h-[150px] w-full p-4 bg-gray-900 border-t border-gray-700 shadow-xl md:flex-col md:items-center md:justify-center md:p-6">
      <div className="flex justify-center gap-4 mb-2">
        <SocialLinks />
      </div>
      <ul className="flex flex-wrap justify-center mt-3 text-sm font-medium text-gray-300 sm:mt-0 mb-2">
        <li>
          <Link
            href="/#about-section"
            className="mr-4 hover:underline hover:text-blue-400 md:mr-6 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/privacy-policy"
            className="mr-4 hover:underline hover:text-blue-400 md:mr-6 transition-colors"
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/licensing"
            className="mr-4 hover:underline hover:text-blue-400 md:mr-6 transition-colors"
          >
            Licensing
          </Link>
        </li>
        <li>
          <Link
            href="/secret-message"
            className="mr-4 hover:underline hover:text-blue-400 md:mr-6 transition-colors"
          >
            Secret
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:underline hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="flex justify-center">
        <span className="text-sm text-gray-300 sm:text-center">
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://www.williamarice.com"
            className="hover:underline hover:text-blue-400 transition-colors"
          >
            William Rice
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
