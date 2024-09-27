"use server";

import ContactForm from "../../components/contact-form/ContactForm";
import React from "react";
import Header from "@/components/Header";
const ContactPage = () => {
  return (
    <>
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Contact
          </h1>
        </div>
      </Header>
      <div className="my-10 flex justify-center w-full">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;
