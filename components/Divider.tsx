import React from "react";

interface DividerProps {
  width?: number;
}

const Divider = ({ width = 48 }: DividerProps) => {
  return (
    <hr
      style={{ width: `${width}px` }}
      className="h-1 mx-auto my-4 bg-blue-500 border-0 rounded"
    />
  );
};

export default Divider;
