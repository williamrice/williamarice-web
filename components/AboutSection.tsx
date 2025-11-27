import React from "react";
import Image from "next/image";
import { AiFillCode, AiFillTrophy } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { FeatureCard } from "./FeaturedCard";

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
              Hello, I&apos;m William (You can call me Billy!)
            </h3>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                I&apos;m a Software Developer in Eastern Kentucky with an
                unconventional path to tech. After growing up in challenging
                circumstances and serving 12+ years in law enforcement, I
                transitioned a lifelong programming hobby into a full-time
                career by consistently challenging myself and building skills
                across a variety of technologies.
              </p>
              <p className="text-lg">
                I recently earned my Master of Science in Software Engineering,
                complementing years of self taught learning. I specialize in PHP
                (WordPress ecosystem), modern JavaScript frameworks, C#/.NET,
                and C++, with a focus on clean architecture, accessibility, and
                performance-driven solutions.
              </p>
              <p className="text-lg">
                When I&apos;m not coding, you&apos;ll find me hiking the Red
                River Gorge, spending quality time with my family, or serving my
                community as an elected City Councilman.
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

export default AboutSection;
