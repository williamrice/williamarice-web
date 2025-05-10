"use client";

import React from "react";
import Image from "next/image";
import CredlyBadge from "./CredlyBadge";
import { Badge } from "@/app/credentials/page";

interface BadgeCardProps extends Badge {}

export default function BadgeCard({
  title,
  type,
  badgeId,
  badgeUrl,
  imageUrl,
  viewUrl,
}: BadgeCardProps) {
  const width = 330;
  const height = 191;
  return (
    <div className="shadow-sm rounded-md border-2 border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex-grow flex items-center justify-center w-full">
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
