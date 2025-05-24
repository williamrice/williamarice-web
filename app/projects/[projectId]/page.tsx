import { getProjectById } from "@/actions/projects";
import Header from "@/components/Header";
import TechnologyPill from "@/components/TechnologyPill";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiFillEye } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const IndividualProjectPage = async ({
  params,
}: {
  params: { projectId: string };
}) => {
  const project = await getProjectById(parseInt(params.projectId));

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-xl mb-8">
          {"Sorry, the project you're looking for doesn't exist."}
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn bg-gray-900 text-white">
      <Header>
        <div className="h-full flex flex-col items-center justify-center animate-slideDown">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white mb-4">
            {project.title}
          </h1>
        </div>
      </Header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-slideUp">
          {project.technologies.map((technology) => (
            <TechnologyPill key={technology} technology={technology} />
          ))}
        </div>

        {/* Project links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slideUp">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-500 text-white font-medium hover:border-blue-600 transition-all duration-300"
              >
                <AiFillGithub className="mr-2 h-6 w-6" /> View Source Code
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-700 text-white font-medium shadow-md hover:bg-blue-800 transition-all duration-300"
              >
                <AiFillEye className="mr-2 h-6 w-6" /> View Live Project
              </Link>
            )}
          </div>
        )}

        {/* Featured Image Section */}
        <div className="mb-16 animate-slideUp bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
          <Zoom>
            <div className="relative h-[500px] w-full overflow-hidden">
              <Image
                src={project.featuredImageSrc}
                alt={project.featuredImageAlt}
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-500"
                unoptimized={true}
              />
            </div>
          </Zoom>
        </div>

        {/* Description Section */}
        <div className="mb-16 animate-slideUp bg-gray-800 p-8 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6">Description</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mb-16 animate-slideUp bg-gray-800 p-8 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6">Problem</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="mb-16 animate-slideUp bg-gray-800 p-8 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6">Solution</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.solution}
          </p>
        </div>

        <div className="mb-16 animate-slideUp bg-gray-800 p-8 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6">Story</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            {project.story}
          </p>
        </div>

        {project.galleryImages && project.galleryImages.length > 0 && (
          <>
            <div className="mb-16 animate-slideUp bg-gray-800 p-8 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.galleryImages.map((image, index) => (
                  <Zoom key={index}>
                    <div className="relative h-48 overflow-hidden rounded-xl">
                      <Image
                        src={image.imagePath}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover transform hover:scale-105 transition-transform duration-500"
                        unoptimized={true}
                      />
                    </div>
                  </Zoom>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-4 animate-slideUp mb-12">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndividualProjectPage;
