import React from "react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

const AboutSection = () => {
  return (
    <div id="about-section" className="w-full py-16 px-4 flex justify-center">
      <div className="max-w-8xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/images/coding_shot.jpg"
              alt="William Rice"
              width={600}
              height={600}
              className="rounded:md border-2 shadow-md border-gray-300"
            />
          </div>
          <div className="w-full md:w-1/2 px-10">
            <SectionHeader title="About Me" />
            <p className="text-lg text-left mb-8">
              Hello! I&apos;m William Rice, welcome to my little space on the
              web. I&apos;m proudly from Eastern Kentucky and I grew up like
              most kids here as indigent and in unfavorable conditions with my
              parents being addicted to drugs. I overcame the odds and proudly
              served my community as a police officer for over 12 years and now
              I&apos;m working full time as a Software Developer. I&apos;ve had
              a lifelong passion for technology and writing code.
            </p>
            <p className="text-lg text-left mb-8">
              I&apos;m proficient in a range of programming languages and
              frameworks, with experience spanning WordPress plugin development
              (PHP), video game modding (C++), and full-stack web development
              using React and other modern frameworks. I&apos;m comfortable
              learning new languages and frameworks as needed and don&apos;t
              feel limited by any particular technology.
            </p>
            <p className="text-lg text-left mb-8">
              When I&apos;m not writing code, you can find me hiking in the Red
              River Gorge, working out, or reading a tech book cramming my brain
              with more knowledge. I also serve my community as an elected City
              Councilman.
            </p>
            <p className="text-lg text-left mb-8">
              I&apos;m always excited to take on new challenges and collaborate
              on innovative projects. I would really like to contribute to more
              open source projects. Feel free to reach out if you&apos;d like to
              connect or discuss potential opportunities!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
