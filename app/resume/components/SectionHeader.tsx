import React from "react";
type Props = {
  title: string;
};

const SectionHeader = ({ title }: Props) => {
  return (
    <div className="flex justify-center items-center h-20 w-full border-2 rounded-lg border-slate-700 bg-slate-500 my-4">
      <h1 className="text-xl font-extrabold text-white">{title}</h1>
    </div>
  );
};

export default SectionHeader;
