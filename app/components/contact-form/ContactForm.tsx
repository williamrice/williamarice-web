"use client";

import React, { useState } from "react";
import SuccessfulEmailBanner from "./SuccessfulEmailBanner";
import { ContactFormState } from "./contact_form_state";
import { PulseLoader } from "react-spinners";
import ErrorEmailBanner from "./ErrorEmailBanner";

const ContactForm = () => {
  const [contactFormState, setContactFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    formError: {
      isError: false,
      message: "",
    },
    formSuccess: false,
    isLoading: false,
  });

  async function handleContactForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (
      !contactFormState.name ||
      !contactFormState.email ||
      !contactFormState.message
    ) {
      setContactFormState({
        ...contactFormState,
        formError: { isError: true, message: "Please fill out all fields." },
      });
      return;
    }
    setContactFormState({ ...contactFormState, isLoading: true });
    const res = await fetch("/api/contact-form-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactFormState.name,
        email: contactFormState.email,
        message: contactFormState.message,
      }),
    });
    setContactFormState({ ...contactFormState, isLoading: false });
    if (res.status === 200) {
      setContactFormState({
        ...contactFormState,
        name: "",
        email: "",
        message: "",
        formSuccess: true,
      });
    } else {
      setContactFormState({
        ...contactFormState,
        formError: {
          isError: true,
          message: "Something went wrong. Please try again later.",
        },
      });
    }
  }

  return (
    <div className="block w-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-900 dark:border-gray-700 ">
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setContactFormState({ ...contactFormState, name: e.target.value })
            }
            value={contactFormState.name}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={contactFormState.email}
            onChange={(e) =>
              setContactFormState({
                ...contactFormState,
                email: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Message
          </label>
          <textarea
            name="message"
            rows={3}
            cols={40}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) =>
              setContactFormState({
                ...contactFormState,
                message: e.target.value,
              })
            }
            value={contactFormState.message}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-90 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleContactForm}
        >
          {contactFormState.isLoading ? (
            <PulseLoader size={10} color="white" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      {contactFormState.formError.isError && (
        <ErrorEmailBanner message={contactFormState.formError.message} />
      )}
      {contactFormState.formSuccess && <SuccessfulEmailBanner />}
    </div>
  );
};

export default ContactForm;
