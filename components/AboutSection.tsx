import React from "react";
import Image from "next/image";
import { AiFillCode, AiFillTrophy } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";

const AboutSection = () => {
  return (
    <div id="about-section" className="w-full py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="lg:w-5/12 lg:sticky lg:top-24 self-start">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-blue-700 rounded-lg"></div>
              <Image
                src="/images/coding_shot.jpg"
                alt="William Rice"
                width={600}
                height={600}
                className="relative rounded-lg shadow-xl border-4 border-gray-700"
              />
            </div>
          </div>

          <div className="lg:w-7/12 mt-12 lg:mt-0 text-left">
            {" "}
            <h3 className="text-2xl font-bold text-white mb-6">
              Hello, I&apos;m William (I go by Billy)
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                I&apos;m a Software Developer based in Eastern Kentucky with a
                distinctive professional background. Growing up in poverty while
                moving between homes due to my parents&apos; addiction
                struggles, I transformed these challenges into motivation and
                dedicated over 12 years to public service as a law enforcement
                officer before transitioning to full-time software development.
              </p>
              <p className="text-lg">
                My commitment to technology and programming spans decades. I
                bring expertise across multiple programming languages and
                frameworks, including PHP for WordPress plugin development, C++
                for application modding, and modern JavaScript frameworks for
                comprehensive full-stack web development solutions.
              </p>
              <p className="text-lg">
                Beyond software development, I maintain an active lifestyle
                through outdoor recreation in the Red River Gorge, fitness
                training, and continuous learning through technical literature.
                I also continue my public service commitment as an elected City
                Councilman.
              </p>
            </div>
            <div className="space-y-4 mt-8">
              <FeatureCard
                icon={<AiFillCode className="w-7 h-7" />}
                title="Full Stack Developer"
                description="Building complete web applications from the ground up"
              />
              <FeatureCard
                icon={<AiFillTrophy className="w-7 h-7" />}
                title="Public Servant"
                description="Serving my community for over 12 years and counting"
              />
              <FeatureCard
                icon={<FaBook className="w-7 h-7" />}
                title="Lifelong Learner"
                description="Constantly exploring new technologies"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-blue-900 p-3 rounded-full text-blue-400 shrink-0">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <p className="text-gray-300 text-left">{description}</p>
    </div>
  );
};

export default AboutSection;
