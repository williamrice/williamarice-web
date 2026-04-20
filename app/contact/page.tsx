'use server';

import { ContactForm } from '@/components/contact-form/ContactForm';
import Header from '@/components/Header';
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
        <div className="flex justify-center max-w-4xl mx-auto px-4 py-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
