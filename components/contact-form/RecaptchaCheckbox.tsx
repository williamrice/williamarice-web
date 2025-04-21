"use client";

import React, { useEffect } from "react";
import Script from "next/script";

interface RecaptchaCheckboxProps {
  onVerify: (token: string | null) => void;
}

declare global {
  interface Window {
    onRecaptchaSuccess?: (token: string) => void;
  }
}

const RecaptchaCheckbox: React.FC<RecaptchaCheckboxProps> = ({ onVerify }) => {
  useEffect(() => {
    window.onRecaptchaSuccess = (token: string) => {
      onVerify(token);
    };

    return () => {
      delete window.onRecaptchaSuccess;
    };
  }, [onVerify]);

  return (
    <>
      <div className="mb-6">
        <Script src={`https://www.google.com/recaptcha/api.js`} async defer />
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_CLIENT_KEY}
          data-callback="onRecaptchaSuccess"
        />
      </div>
    </>
  );
};

export default RecaptchaCheckbox;
