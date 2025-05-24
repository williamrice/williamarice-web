"use client";

import React, { useRef, useEffect, useState } from "react";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  className = "",
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dividerWidth, setDividerWidth] = useState<number>(48);

  useEffect(() => {
    if (headingRef.current) {
      const width = headingRef.current.offsetWidth;
      setDividerWidth(width);
    }
  }, [title]); // Re-run when title changes

  return (
    <div className={`flex flex-col items-center mb-4 ${className}`}>
      <h2 ref={headingRef} className="text-4xl font-bold mb-1 text-white">
        {title}
      </h2>
      <div className="w-20 h-1 bg-blue-600"></div>
    </div>
  );
};

export default SectionHeader;
