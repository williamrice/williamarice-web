import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

const SocialLinks = () => {
  const size: number = 40;
  return (
    <>
      <a href="https://www.github.com/williamrice" target="blank">
        <AiFillGithub size={size} className="hover:text-black cursor-pointer" />
      </a>
      <a href="https://www.linkedin.com/in/realwilliamrice/" target="blank">
        <AiFillLinkedin
          size={size}
          className="hover:text-blue-700 cursor-pointer"
        />
      </a>
      <a href="https://www.twitter.com/bill2rice" target="blank">
        <AiFillTwitterCircle
          size={size}
          className="hover:text-sky-500 cursor-pointer"
        />
      </a>
    </>
  );
};

export default SocialLinks;
