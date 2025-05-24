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
    <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg overflow-hidden h-full w-full hover:shadow-xl transition-all duration-200 hover:border-blue-500 flex flex-col">
      {/* Header section with dark background */}
      <div className="bg-gray-800 p-4 border-b border-gray-600">
        <h2 className="text-xl font-semibold text-center text-white">
          {title}
        </h2>
      </div>

      {/* Content section with light background for embeds */}
      <div className="bg-gray-100 p-6 flex-grow flex items-center justify-center min-h-[280px]">
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
          <div className="w-full flex justify-center">
            <CredlyBadge badgeId={badgeId} title={title} />
          </div>
        )}
      </div>
    </div>
  );
}
