import React from "react";

interface TechnologyPillProps {
  technology: string;
}

const TechnologyPill = ({ technology }: TechnologyPillProps) => {
  return (
    <div className="m-2 ">
      <p className="text-xs font-bold text-white bg-blue-800 rounded-full py-2 px-4 hover:scale-110 transition-all ease-in-out border border-blue-600">
        {technology}
      </p>
    </div>
  );
};

export default TechnologyPill;
