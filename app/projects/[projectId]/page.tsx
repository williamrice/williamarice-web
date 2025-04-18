import { getProjectById } from "@/actions/projects";
import Header from "@/components/Header";
import TechnologyPill from "@/components/TechnologyPill";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiFillEye } from "react-icons/ai";
import Divider from "@/components/Divider";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import SectionHeader from "@/components/SectionHeader";

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
    <div className="animate-fadeIn bg-gray-100">
      <Header>
        <div className="h-full flex flex-col items-center justify-center animate-slideDown">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            {project.title}
          </h1>
        </div>
      </Header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slideUp">
          {project.technologies.map((technology) => (
            <TechnologyPill key={technology} technology={technology} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12 animate-slideUp bg-white p-8 rounded-lg shadow-md">
          <Zoom>
            <Image
              src={project.featuredImageSrc}
              alt={project.featuredImageAlt}
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover w-full h-full"
              unoptimized={true}
            />
          </Zoom>
          <div>
            <SectionHeader title="Description" />
            <p className="text-gray-700">{project.description}</p>
          </div>
        </div>

        <div className="mb-12 animate-slideUp bg-white p-8 rounded-lg shadow-md">
          <SectionHeader title="Problem" />
          <p>{project.problem}</p>
        </div>

        <div className="mb-12 animate-slideUp bg-white p-8 rounded-lg shadow-md">
          <SectionHeader title="Solution" />
          <p className="text-gray-700">{project.solution}</p>
        </div>

        <div className="mb-12 animate-slideUp bg-white p-8 rounded-lg shadow-md">
          <SectionHeader title="Story" />
          <p className="text-gray-700">{project.story}</p>
        </div>

        {project.galleryImages && project.galleryImages.length > 0 && (
          <>
            <div className="mb-12 animate-slideUp bg-white p-8 rounded-lg shadow-md">
              <SectionHeader title="Gallery" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.galleryImages.map((image, index) => (
                  <Zoom key={index}>
                    <Image
                      src={image.imagePath}
                      alt={`Gallery image ${index + 1}`}
                      width={300}
                      height={200}
                      className="rounded-lg shadow-md object-cover w-full h-full"
                      unoptimized={true}
                    />
                  </Zoom>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap justify-center gap-4 animate-slideUp">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              <AiFillGithub className="mr-2" /> View on GitHub
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              <AiFillEye className="mr-2" /> View Live Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualProjectPage;
