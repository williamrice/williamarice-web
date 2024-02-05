import OutlinedContainer from "@/components/OutlinedContainer";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container text-justify mx-auto p-4">
      <OutlinedContainer>
        <h1 className="text-2xl font-bold mb-4">
          Privacy Policy for www.williamarice.com
        </h1>

        <p className="mb-4">Last Updated: February 5, 2024</p>

        <p className="mb-4">
          Thank you for visiting www.williamarice.com. Your privacy is important
          to us. This Privacy Policy outlines how we collect, use, disclose, and
          safeguard your personal information. By using our website, you agree
          to the terms of this Privacy Policy.
        </p>
      </OutlinedContainer>

      {/* Information We Collect */}

      {/* Personal Information */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <p className="mb-4">
          <strong>Personal Information</strong>
          <br />
          When you voluntarily create an account on www.williamarice.com, we may
          collect the following personal information:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>
            Any additional information voluntarily provided in your account
            profile
          </li>
        </ul>
        {/* Cookies */}
        <p className="mb-4">
          <strong>Cookies</strong>
          <br />
          We use cookies to enhance your experience on our website. Cookies are
          small text files stored on your device. By using www.williamarice.com,
          you consent to the use of cookies.
        </p>
      </OutlinedContainer>

      {/* How We Use Your Information */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>

        <p className="mb-4">
          We use the collected information, including personal information, for
          the following purposes:
        </p>

        <ul className="list-disc pl-8 mb-4">
          <li>To provide and personalize our services</li>
          <li>To communicate with you regarding your account and updates</li>
          <li>
            To analyze and improve the functionality of www.williamarice.com
          </li>
          <li>To comply with legal obligations</li>
        </ul>
      </OutlinedContainer>

      {/* Sharing Your Information */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">Sharing Your Information</h2>

        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information
          to third parties without your consent. However, we may share your
          information in the following circumstances:
        </p>

        <ul className="list-disc pl-8 mb-4">
          <li>
            With trusted third-party service providers who assist us in
            operating our website
          </li>
          <li>
            To comply with legal obligations, such as responding to lawful
            requests and court orders
          </li>
        </ul>
      </OutlinedContainer>

      {/* Your Choices */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">Your Choices</h2>

        <p className="mb-4">You have the right to:</p>

        <ul className="list-disc pl-8 mb-4">
          <li>Review and update your account information</li>
          <li>Opt-out of receiving promotional communications</li>
          <li>Disable cookies through your browser settings</li>
        </ul>
      </OutlinedContainer>

      {/* Security */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">Security</h2>

        <p className="mb-4">
          We implement reasonable security measures to protect your personal
          information. However, no method of transmission over the internet or
          electronic storage is completely secure. Therefore, we cannot
          guarantee absolute security.
        </p>
      </OutlinedContainer>

      {/* Changes to This Privacy Policy */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">
          Changes to This Privacy Policy
        </h2>

        <p className="mb-4">
          We may update this Privacy Policy periodically. The date of the last
          update will be reflected at the top of the page. We encourage you to
          review this Privacy Policy regularly for any changes.
        </p>
      </OutlinedContainer>

      {/* Contact Us */}
      <OutlinedContainer>
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>

        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at billyrice12@live.com.
        </p>
      </OutlinedContainer>
    </div>
  );
};

export default PrivacyPolicy;
