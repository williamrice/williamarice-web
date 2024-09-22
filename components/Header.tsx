import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  imagePath?: string;
  height?: string;
}

const Header = ({
  children,
  imagePath = "/images/header.jpg",
  height = "600px",
}: HeaderProps) => {
  const backgroundImageStyle = `url(${imagePath})`;
  return (
    <section
      style={{
        backgroundImage: backgroundImageStyle,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: height,
      }}
      className="rounded-md w-full lg:bg-center"
    >
      <div
        style={{ minHeight: height }}
        className="flex justify-center items-center bg-[rgba(0,0,0,0.5)] bg-blend-overlay"
      >
        {children}
      </div>
    </section>
  );
};

export default Header;
