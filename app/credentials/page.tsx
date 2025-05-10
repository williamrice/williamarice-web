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
// <blockquote class="badgr-badge" style="font-family: Helvetica, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif;"><a href="https://api.badgr.io/public/assertions/nYyjsdcHTUOAySpCBig09g?identity__email=wrice22%40wgu.edu"><img width="120px" height="120px" src="https://api.badgr.io/public/assertions/nYyjsdcHTUOAySpCBig09g/image"></a><p class="badgr-badge-name" style="hyphens: auto; overflow-wrap: break-word; word-wrap: break-word; margin: 0; font-size: 16px; font-weight: 600; font-style: normal; font-stretch: normal; line-height: 1.25; letter-spacing: normal; text-align: left; color: #05012c;">WGU Capstone Excellence Award</p><p class="badgr-badge-date" style="margin: 0; font-size: 12px; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #555555;"><strong style="font-size: 12px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #000;">Awarded: </strong>Apr 28, 2025</p><p class="badgr-badge-recipient" style="margin: 0; font-size: 12px; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #555555;"><strong style="font-size: 12px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #000;">Awarded To: </strong><span style="display: block;"> William A Rice</span></p><p style="margin: 16px 0; padding: 0;"><a class="badgr-badge-verify" target="_blank" href="https://badgecheck.io?url=https%3A%2F%2Fapi.badgr.io%2Fpublic%2Fassertions%2FnYyjsdcHTUOAySpCBig09g%3Fidentity__email%3Dwrice22%2540wgu.edu&amp;identity__email=wrice22%40wgu.edu" style="box-sizing: content-box; display: flex; align-items: center; justify-content: center; margin: 0; font-size:14px; font-weight: bold; width: 48px; height: 16px; border-radius: 4px; border: solid 1px black; text-decoration: none; padding: 6px 16px; margin: 16px 0; color: black;" aria-label="Verify (opens in new window)">VERIFY</a></p><script async="async" src="https://wgu.badgr.com/assets/widgets.bundle.js"></script></blockquote>
// <blockquote class="badgr-badge" style="font-family: Helvetica, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif;"><a href="https://api.badgr.io/public/assertions/MfpzNtt0QH2D2nP2PSNr8w?identity__email=wrice22%40wgu.edu"><img width="120px" height="120px" src="https://api.badgr.io/public/assertions/MfpzNtt0QH2D2nP2PSNr8w/image"></a><p class="badgr-badge-name" style="hyphens: auto; overflow-wrap: break-word; word-wrap: break-word; margin: 0; font-size: 16px; font-weight: 600; font-style: normal; font-stretch: normal; line-height: 1.25; letter-spacing: normal; text-align: left; color: #05012c;">WGU Certificate: Front-End Developer</p><p class="badgr-badge-date" style="margin: 0; font-size: 12px; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #555555;"><strong style="font-size: 12px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #000;">Awarded: </strong>Feb 27, 2025</p><p class="badgr-badge-recipient" style="margin: 0; font-size: 12px; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #555555;"><strong style="font-size: 12px; font-weight: bold; font-style: normal; font-stretch: normal; line-height: 1.67; letter-spacing: normal; text-align: left; color: #000;">Awarded To: </strong><span style="display: block;"> William A Rice</span></p><p style="margin: 16px 0; padding: 0;"><a class="badgr-badge-verify" target="_blank" href="https://badgecheck.io?url=https%3A%2F%2Fapi.badgr.io%2Fpublic%2Fassertions%2FMfpzNtt0QH2D2nP2PSNr8w%3Fidentity__email%3Dwrice22%2540wgu.edu&amp;identity__email=wrice22%40wgu.edu" style="box-sizing: content-box; display: flex; align-items: center; justify-content: center; margin: 0; font-size:14px; font-weight: bold; width: 48px; height: 16px; border-radius: 4px; border: solid 1px black; text-decoration: none; padding: 6px 16px; margin: 16px 0; color: black;" aria-label="Verify (opens in new window)">VERIFY</a></p><script async="async" src="https://wgu.badgr.com/assets/widgets.bundle.js"></script></blockquote>
// Define badge data
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
