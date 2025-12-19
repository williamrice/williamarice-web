"use server";

import ContactForm from "../../components/contact-form/ContactForm";
import Header from "@/components/Header";
const ContactPage = async () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Contact
          </h1>
        </div>
      </Header>

      {/* Content section with subtle gradient background */}
      <div className="bg-linear-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a question or want to work together? I&apos;d love to hear
              from you. Send me a message and I&apos;ll respond as soon as
              possible.
            </p>
          </div>

          <div className="flex justify-center w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
