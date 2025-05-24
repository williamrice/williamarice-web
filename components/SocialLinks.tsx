import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const SocialLinks = () => {
  const size: number = 40;
  return (
    <>
      <a href="https://www.github.com/williamrice" target="blank">
        <AiFillGithub
          size={size}
          className="text-white hover:text-gray-300 cursor-pointer transition-colors"
        />
      </a>
      <a href="https://www.linkedin.com/in/realwilliamrice/" target="blank">
        <AiFillLinkedin
          size={size}
          className="text-white hover:text-blue-400 cursor-pointer transition-colors"
        />
      </a>
      <a href="https://www.x.com/warice_dev" target="blank">
        <FaSquareXTwitter
          size={size}
          className="text-white hover:text-gray-300 cursor-pointer transition-colors"
        />
      </a>
    </>
  );
};

export default SocialLinks;
