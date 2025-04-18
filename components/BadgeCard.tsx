"use client";

import React from "react";
import Image from "next/image";
import CredlyBadge from "./CredlyBadge";

interface BadgeCardProps {
  title: string;
  type: "badgr" | "credly" | "image";
  badgeId?: string;
  badgeUrl?: string;
  imageUrl?: string;
  viewUrl?: string;
  width?: number;
  height?: number;
}

export default function BadgeCard({
  title,
  type,
  badgeId,
  badgeUrl,
  imageUrl,
  viewUrl,
  width = 330,
  height = 191,
}: BadgeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex-grow flex items-center justify-center w-full">
        {type === "badgr" && badgeUrl && (
          <div
            className="relative"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <iframe
              src={badgeUrl}
              title={`Badge: ${title}`}
              style={{ width: "100%", height: "100%", border: "0px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {type === "image" && imageUrl && (
          <div
            className="relative"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {viewUrl ? (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <Image
                  src={imageUrl}
                  alt={`Badge: ${title}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </a>
            ) : (
              <Image
                src={imageUrl}
                alt={`Badge: ${title}`}
                fill
                style={{ objectFit: "contain" }}
              />
            )}
          </div>
        )}

        {type === "credly" && badgeId && (
          <CredlyBadge badgeId={badgeId} title={title} />
        )}
      </div>
    </div>
  );
}
