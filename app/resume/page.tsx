"use client";

import Header from "@/components/Header";
import React, { useEffect, useState, useRef } from "react";
import { SkewLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { ResumeType } from "@/app/types/resume";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

const ResumePage: React.FC = () => {
  const [data, setData] = useState<ResumeType | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: `
      @page {
        size: auto;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          font-size: 10px;
        }
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }
    `,
    documentTitle: "William_Rice_Resume.pdf",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/resume", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch resume data");
        }
        const jsonData = (await response.json()) as ResumeType;
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SkewLoader color="#4A90E2" />
      </div>
    );
  }

  if (!data) {
    return <div>Error loading resume data</div>;
  }

  return (
    <>
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Resume
          </h1>
        </div>
      </Header>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <button
          onClick={() => handlePrint()}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Print Resume
        </button>
        <div ref={contentRef} className="bg-white text-gray-800 text-sm">
          <header className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold">{data.name}</h1>
            <p className="text-base sm:text-lg text-gray-600">{data.label}</p>
            <div className="mt-1 flex flex-col items-start">
              <div className="flex flex-wrap items-center mb-1">
                <a
                  href={`mailto:${data.email}`}
                  className="mr-2 hover:text-blue-500"
                >
                  {data.email}
                </a>
                <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
                <span className="mr-2">{data.phone}</span>
                <span className="text-gray-500 mx-2 hidden sm:inline">|</span>
                <span className="mr-2">
                  {data.city}, {data.region}
                </span>
              </div>
              <div className="flex flex-wrap items-center">
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2 hover:text-blue-500"
                >
                  <FaGlobe className="inline mr-1" />
                  <span className="hidden sm:inline">{data.url}</span>
                </a>
                {data.profiles.map((profile, index) => (
                  <React.Fragment key={index}>
                    <span className="text-gray-500 mx-2 hidden sm:inline">
                      |
                    </span>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 hover:text-blue-500"
                    >
                      {profile.network === "LinkedIn" && (
                        <FaLinkedin className="inline mr-1" />
                      )}
                      {profile.network === "Github" && (
                        <FaGithub className="inline mr-1" />
                      )}
                      <span className="hidden sm:inline">
                        {profile.username}
                      </span>
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </header>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Summary
            </h2>
            <p className="text-xs sm:text-sm">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Skills
            </h2>
            <div className="flex flex-wrap text-xs sm:text-sm">
              {data.skills.map((skill, index) => (
                <div key={index} className="mr-4 mb-1">
                  <strong>
                    {skill.name} ({skill.level}):
                  </strong>{" "}
                  {skill.keywords.join(", ")}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Work Experience
            </h2>
            {data.work.slice(0, 3).map((job, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold">
                  {job.position} - {job.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {job.location}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatDate(job.startDate.toString())} -{" "}
                  {job.endDate ? formatDate(job.endDate.toString()) : "Present"}
                </p>
                <p className="text-xs sm:text-sm mt-1">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold">
                  {edu.institution}
                </h3>
                <p className="text-xs sm:text-sm">
                  {edu.studyType} in {edu.area}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatDate(edu.startDate.toString())} -{" "}
                  {formatDate(edu.endDate.toString())}
                </p>
                <p className="text-xs sm:text-sm">GPA: {edu.score}</p>
                {edu.courses.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {edu.courses.map((course, cIndex) => (
                      <span
                        key={cIndex}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.certificates.map((cert, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                >
                  {cert.name} - {cert.issuer} (
                  {formatDate(cert.date.toString())})
                </div>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold">
                  {project.name}
                </h3>
                {project.url && (
                  <div className="flex items-start gap-1">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Project Link:
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-blue-500 hover:underline"
                    >
                      {project.url}
                    </a>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatDate(project.startDate.toString())} -{" "}
                  {project.endDate
                    ? formatDate(project.endDate.toString())
                    : "Present"}
                </p>
                <p className="text-xs sm:text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.highlights.map((highlight, hIndex) => (
                    <span
                      key={hIndex}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Volunteer Experience
            </h2>
            {data.volunteer.map((vol, index) => (
              <div key={index} className="mb-2">
                <h3 className="text-sm sm:text-base font-semibold">
                  {vol.position} - {vol.organization}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatDate(vol.startDate.toString())} - Present
                </p>
                <p className="text-xs sm:text-sm">{vol.summary}</p>
                {vol.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vol.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold border-b border-gray-300 mb-1">
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.interests.map((interest, index) => (
                <div
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                >
                  <strong>{interest.name}:</strong>{" "}
                  {interest.keywords.join(", ")}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ResumePage;
