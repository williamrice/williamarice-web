"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

function HeaderTypeAnimation() {
  return (
    <TypeAnimation
      cursor={false}
      className="lg:text-4xl text-2xl font-bold text-center text-white"
      sequence={[
        "I am a programmer",
        2000,
        "I am a hiking enthusiast",
        2000,
        "I am a learner",
        2000,
        "I am a Software Developer",
        2000,
      ]}
    />
  );
}

export default HeaderTypeAnimation;
