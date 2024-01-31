"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { SkewLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SectionHeader from "./components/SectionHeader";

const ResumePage = () => {
  const imageUrl =
    "https://raw.githubusercontent.com/williamrice/williamrice.github.io/main/profile_tie.jpg" as const;
  const [data, setData] = React.useState<any>(null);
  const [dataLoading, setDataLoading] = React.useState(false);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        "https://raw.githubusercontent.com/williamrice/williamrice.github.io/main/resume.json",
        { next: { revalidate: 3600 } }
      );
      setDataLoading(true);
      const data = await res.json();
      setData(data);
      setDataLoading(false);
    }
    getData();
    console.log(data);
    return () => {};
  }, []);

  return (
    <>
      {data ? (
        // Basic Resume Information
        <div className="flex justify-center w-full h-full">
          <div className="flex-col items-center text-center justify-center mt-4 p-4 w-72 md:w-3/4">
            <Image
              src={imageUrl}
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full hover:scale-125 transition duration-500 ease-in-out transform hover:shadow-2xl h-48 w-48 mx-auto my-6"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-extrabold m-1">
                {data?.basics?.name}
              </p>
              <p className="text-xl text-muted-foreground m-1">
                {data?.basics?.label}
              </p>
              <p className="text-md font-bold mb-2">{data?.basics?.email}</p>
              <div className="text-wrap text-center align-middle text-xs w-full md:w-3/4 ">
                <p className="">{data?.basics?.summary}</p>
              </div>
            </div>

            <SectionHeader title="Skills" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {data.skills?.map((skill: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{skill.name}</CardTitle>
                    <CardDescription>{skill.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="md:flex md:flex-wrap gap-2 justify-center ">
                    {skill.keywords?.map((keyword: any, index: number) => (
                      <div
                        key={index}
                        className=" border-2 border-white-200 rounded-full my-1"
                      >
                        <p className="p-2 text-xs">{keyword}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* // Resume Employment */}
            <SectionHeader title="Employment History" />

            <div className="grid grid-cols-1  gap-2 mt-4">
              {data.work.map((work: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{work.position}</CardTitle>
                    <CardDescription>
                      <p>{work.name}</p>
                      <p>{work.location}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="md:flex md:flex-wrap gap-2 justify-center ">
                    {work.summary}
                  </CardContent>
                  <CardContent className="flex justify-center">
                    <div className="border-2 rounded-md w-48 p-4">
                      {/* <p className="text-sm mb-1">Dates Employed</p> */}
                      <div className="gap-2">
                        <p className="text-xs">
                          {new Date(work.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs">&nbsp; - &nbsp;</p>
                        <p className="text-xs">
                          {work.endDate
                            ? new Date(work.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <SectionHeader title="Education" />

            {data.education.map((education: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{education.studyType}</CardTitle>
                  <CardDescription>{education.institution}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-md">GPA - {education.score}</p>
                </CardContent>
                <CardContent className="md:flex md:flex-wrap gap-2 justify-center ">
                  <p className="text-xs">
                    {new Date(education.startDate).getFullYear()}
                  </p>
                  <p className="text-xs">&nbsp; - &nbsp;</p>
                  <p className="text-xs">
                    {education.endDate
                      ? new Date(education.endDate).getFullYear()
                      : "Present"}
                  </p>
                </CardContent>

                <CardContent>
                  <Separator className="my-2" />
                  <p className="text-lg">Notable Courses</p>
                </CardContent>
                <CardContent className="md:flex md:flex-wrap gap-2 justify-center ">
                  {education.courses.map((course: any, index: number) => (
                    <div
                      key={index}
                      className=" border-2 border-white-200 rounded-full my-1"
                    >
                      <p className="p-2 text-xs">{course}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            <SectionHeader title="Certificates" />
            <div className="grid grid-cols-1 gap-2 mt-4 md:grid-cols-2">
              {data?.certificates?.map((cert: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                    <CardDescription>{cert.issuer}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex md:flex-wrap gap-2 justify-center ">
                    <div className="border-2 border-white-200 rounded-md h-fit w-fit p-4">
                      <p className="text-sm">Issued On:</p>
                      <p className="text-xs">
                        {new Date(cert.date).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <SectionHeader title="Volunteer Experience" />
            {data.volunteer.map((vol: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{vol.organization}</CardTitle>
                  <CardDescription className="text-lg pt-4">
                    {vol.position}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="border-2 rounded-md w-48 p-4">
                    <p className="text-xs">
                      {new Date(vol.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs">&nbsp; - &nbsp;</p>
                    <p className="text-xs">
                      {vol.endDate
                        ? new Date(vol.endDate).toLocaleDateString()
                        : "Present"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <SectionHeader title="Hobbys and Interests" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
              {data.interests.map((interest: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{interest.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="md:flex md:flex-wrap gap-2 justify-center">
                    {interest.keywords.map((course: any, index: number) => (
                      <div
                        key={index}
                        className=" border-2 border-white-200 rounded-full my-1"
                      >
                        <p className="p-2 text-xs">{course}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-center mx-auto mt-10">
          <SkewLoader color="white" loading={dataLoading} size={30} />
          <p>Resume Loading</p>
        </div>
      )}
    </>
  );
};

export default ResumePage;
