import React from "react";

interface ErrorEmailBannerProps {
  message: string;
}

const ErrorEmailBanner = (props: ErrorEmailBannerProps) => {
  return (
    <div className="bg-red-500 flex w-full mt-4 p-4 rounded-lg justify-center">
      <p className="text-white">{props.message}</p>
    </div>
  );
};

export default ErrorEmailBanner;
