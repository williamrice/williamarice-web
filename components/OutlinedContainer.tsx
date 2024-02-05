import React from "react";

const OutlinedContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-solid border-2 rounded-md p-4 my-2 flex-col items-center">
      {children}
    </div>
  );
};

export default OutlinedContainer;
