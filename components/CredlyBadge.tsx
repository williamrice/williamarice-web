"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface CredlyBadgeProps {
  badgeId: string;
  title: string;
}

export default function CredlyBadge({ badgeId, title }: CredlyBadgeProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize Credly badges after component mounts
    if (window.Credly) {
      window.Credly.initialize();
    }
  }, []);

  return (
    <>
      <Script
        id={`credly-script-${badgeId}`}
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="afterInteractive"
      />
      {isClient && (
        <div className="mx-auto">
          <div
            data-iframe-width="150"
            data-iframe-height="270"
            data-share-badge-id={badgeId}
            data-share-badge-host="https://www.credly.com"
          />
        </div>
      )}
    </>
  );
}
