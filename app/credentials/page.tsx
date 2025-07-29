import React from "react";
import Header from "@/components/Header";
import BadgeCard from "@/components/BadgeCard";

export interface Badge {
  title: string;
  type: "image" | "credly";
  imageUrl?: string;
  viewUrl?: string;
  badgeId?: string;
  badgeUrl?: string;
}

const badges: Badge[] = [
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
    title: "Capstone Excellence Award",
    type: "image" as const,
    imageUrl:
      "https://api.badgr.io/public/assertions/nYyjsdcHTUOAySpCBig09g/image",
    viewUrl:
      "https://api.badgr.io/public/assertions/nYyjsdcHTUOAySpCBig09g?identity__email=wrice22%40wgu.edu",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    type: "credly" as const,
    badgeId: "20acc96e-29fd-4e65-9fb4-7623a80b1be1",
  },
  {
    title: "CompTIA Project+",
    type: "credly" as const,
    badgeId: "755b3863-f406-4856-8826-648adbd2290b",
  },
  {
    title: "CCNA: Introduction to Networks",
    type: "credly" as const,
    badgeId: "c14dd41a-037b-4570-9b96-21e642cc90fa",
  },
];

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header>
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
          Credentials
        </h1>
      </Header>

      {/* Content section with subtle gradient background */}
      <div className="bg-linear-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Professional Certifications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              In addition to my Bachelor of Science in Software Engineering,
              here is a collection of my professional certifications and
              achievements. Click on any badge to view more details and verify
              authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {badges.map((badge, index) => (
              <div key={index} className="w-full">
                <BadgeCard
                  title={badge.title}
                  type={badge.type}
                  badgeId={badge.badgeId}
                  imageUrl={badge.imageUrl}
                  viewUrl={badge.viewUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
