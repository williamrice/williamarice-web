"use client";

import React, { useRef, useEffect, useState } from "react";
import Divider from "./Divider";

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
      <h2 ref={headingRef} className="text-4xl font-bold mb-1">
        {title}
      </h2>
      <Divider width={dividerWidth} />
    </div>
  );
};

export default SectionHeader;
