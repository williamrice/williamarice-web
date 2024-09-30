import React from "react";
import Image from "next/image";
import Divider from "./Divider";

const aboutMeText = `
Hello! I'm William Rice, welcome to my little space on the web. I'm proudly from Eastern Kentucky and I grew up like most kids here as indigent and in unfavorable conditions with my parents being addicted to drugs. I overcame the odds and proudly served my community as a police officer for over 12 years and now I'm working full time as a Software Developer. I've had a lifelong passion for technology and writing code. 

I know several programming languages and frameworks. My experience includes anything from writing Wordpress Plugins in PHP, building video game mods in C++ to full stack web development with React and other frameworks.

When I'm not coding, you can find me hiking in the Red River Gorge, working out at the gym, or reading a tech book cramming my brain with more knowledge.

I'm always excited to take on new challenges and collaborate on innovative projects. Feel free to reach out if you'd like to connect or discuss potential opportunities!
`;

const AboutSection = () => {
  return (
    <div className="w-full py-16 px-4 flex justify-center">
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
            <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>
            <Divider />
            <p className="text-lg leading-relaxed whitespace-pre-line mb-8">
              {aboutMeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
