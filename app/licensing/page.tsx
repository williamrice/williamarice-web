import OutlinedContainer from "@/components/OutlinedContainer";
import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const LicensingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <OutlinedContainer>
        <h1 className="text-2xl text-center font-bold mb-4">
          Licensing Information
        </h1>

        <p className="mb-4">
          All content and materials on this website (www.williamarice.com) are
          the property of William Rice and are protected by intellectual
          property laws. Unauthorized use or reproduction of any content,
          including but not limited to text, images, and code, is strictly
          prohibited.
        </p>

        <p className="mb-4">
          This website is not open source, and the source code is not available
          for public use or distribution. Any attempt to reverse engineer,
          decompile, or otherwise extract the source code is strictly
          prohibited.
        </p>

        <p className="mb-4">
          All rights reserved. William Rice reserves the right to take legal
          action against any individual or entity found to be in violation of
          these terms.
        </p>

        <p>
          If you have any questions or need further clarification regarding the
          licensing of this website, please contact me at billyrice12@live.com.
        </p>
      </OutlinedContainer>
    </div>
  );
};

export default LicensingPage;
