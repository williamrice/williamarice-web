import Image from 'next/image';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaGitlab } from 'react-icons/fa6';
import LinkButton from './MainButton';

const JumboTron = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[85vh] bg-linear-to-r from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
      </div>{' '}
      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center h-full py-12 md:py-20 px-4 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-full">
          {' '}
          {/* Image shown first on mobile, second on desktop */}
          <div className="md:w-1/2 md:order-2 flex justify-center md:justify-end mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-gray-700 rounded-full blur-md transform scale-105 animate-pulse"></div>
              <Image
                src="/images/william_headshot_500x500.jpg"
                width={280}
                height={280}
                alt="Billy Rice"
                className="relative rounded-full border-4 border-white shadow-lg md:w-100 md:h-100 w-55 h-55"
                priority
              />
            </div>
          </div>
          {/* Text content shown second on mobile, first on desktop */}
          <div className="md:w-1/2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Billy Rice
            </h1>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {' '}
                I build software and lead the teams that maintain it.
              </h3>
            </div>
            <p className="text-lg text-gray-200 mt-1 md:mt-2 mb-4 md:mb-8 max-w-xl">
              From leading enterprise software teams to shipping production
              code, I operate at both levels. Available for select consulting
              engagements and web development projects. Let's build something
              great together.
            </p>{' '}
            <div className="flex gap-4">
              <LinkButton type="primary" text="View Resume" link="/resume" />
              <LinkButton type="secondary" text="Contact Me" link="/contact" />
            </div>
            <div className="flex mt-4 md:mt-8 gap-6">
              <a
                href="https://github.com/williamrice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://gitlab.com/williamrice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaGitlab className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/billy-rice/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/warice_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumboTron;
