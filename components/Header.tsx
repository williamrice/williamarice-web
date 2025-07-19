import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  height?: string;
}

const Header = ({ children, height = "400px" }: HeaderProps) => {
  return (
    <section
      style={{
        minHeight: height,
      }}
      className="w-full lg:bg-center shadow-lg border border-gray-700 overflow-hidden bg-linear-to-r from-blue-900 via-blue-800 to-gray-900"
    >
      <div
        style={{ minHeight: height }}
        className="flex justify-center items-center relative"
      >
        {/* Background blur elements */}
        <div className="absolute opacity-20">
          <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gray-600 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
        </div>

        {/* Content container */}
        <div className="z-10 px-6 py-8 text-center">{children}</div>
      </div>
    </section>
  );
};

export default Header;
