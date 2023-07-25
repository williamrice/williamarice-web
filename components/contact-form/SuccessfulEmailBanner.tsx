import React from "react";

const SuccessfulEmailBanner = () => {
  return (
    <>
      <div className="flex justify-center w-full mt-4 p-4 rounded-lg bg-green-500">
        <div>
          <p className=" text-white">Contact form successfully submitted</p>
        </div>
      </div>
    </>
  );
};

export default SuccessfulEmailBanner;
