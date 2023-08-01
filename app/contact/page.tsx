"use server";

import ContactForm from "@/app/components/contact-form/ContactForm";
import React from "react";

const ContactPage = () =>
{
  return (
    <div className="flex justify-center w-full">
      <ContactForm />
    </div>
  );
};

export default ContactPage;
