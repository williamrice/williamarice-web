import React from "react";
import Header from "@/components/Header";
import BadgeCard from "@/components/BadgeCard";

// Define badge data
const badges = [
  {
    title: "Back-End Developer",
    type: "image" as const,
    imageUrl:
      "https://api.badgr.io/public/assertions/I1tehUi7Q2qXPbbGHxknKg/image",
    viewUrl:
      "https://api.badgr.io/public/assertions/I1tehUi7Q2qXPbbGHxknKg?identity__email=wrice22%40wgu.edu",
  },
  {
    title: "Front-End Developer",
    type: "image" as const,
    imageUrl:
      "https://api.badgr.io/public/assertions/MfpzNtt0QH2D2nP2PSNr8w/image",
    viewUrl:
      "https://api.badgr.io/public/assertions/MfpzNtt0QH2D2nP2PSNr8w?identity__email=wrice22%40wgu.edu",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    type: "credly" as const,
    badgeId: "20acc96e-29fd-4e65-9fb4-7623a80b1be1",
  },
  {
    title: "AWS Certified Solutions Architect",
    type: "credly" as const,
    badgeId: "755b3863-f406-4856-8826-648adbd2290b",
  },
  {
    title: "AWS Certified Developer",
    type: "credly" as const,
    badgeId: "c14dd41a-037b-4570-9b96-21e642cc90fa",
  },
];

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          Credentials
        </h1>
      </Header>

      <div className=" mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="p-6 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-3 text-center">
              Professional Certifications
            </h2>
            <p className="text-lg text-gray-700 text-center">
              A collection of my professional certifications and achievements.
              Click on any badge to view more details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <BadgeCard
              key={index}
              title={badge.title}
              type={badge.type}
              badgeId={badge.badgeId}
              imageUrl={badge.imageUrl}
              viewUrl={badge.viewUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
