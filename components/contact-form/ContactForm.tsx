"use client";

import React, { useState, useEffect, useCallback } from "react";
import SuccessfulEmailBanner from "./SuccessfulEmailBanner";
import { ContactFormState } from "./contact_form_state";
import { PulseLoader } from "react-spinners";
import ErrorEmailBanner from "./ErrorEmailBanner";
import RecaptchaCheckbox from "./RecaptchaCheckbox";
import useDebounce from "@/app/lib/useDebounce";

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
    recaptchaToken: null,
  });

  // Track if form has been submitted once
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Debounce the form fields for validation
  const debouncedName = useDebounce(contactFormState.name);
  const debouncedEmail = useDebounce(contactFormState.email);
  const debouncedMessage = useDebounce(contactFormState.message);
  const debouncedToken = useDebounce(contactFormState.recaptchaToken);

  // Function to validate the form
  const validateForm = useCallback(
    (isDebouncedValidation = false) => {
      console.log("Validating form:", {
        name: contactFormState.name,
        email: contactFormState.email,
        message: contactFormState.message,
        recaptchaToken: contactFormState.recaptchaToken,
        hasAttemptedSubmit,
        isDebouncedValidation,
      });

      // Email validation - always check this regardless of submission attempt
      // More strict email regex that requires proper format with @ and domain
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmailValid = emailRegex.test(contactFormState.email);
      console.log("Email validation:", {
        email: contactFormState.email,
        isEmailValid,
      });

      if (!isEmailValid) {
        console.log("Email validation failed");
        setContactFormState({
          ...contactFormState,
          formError: {
            isError: true,
            message: "Please enter a valid email address.",
          },
          formSuccess: false,
        });
        return false;
      }

      if (
        !contactFormState.name ||
        !contactFormState.email ||
        !contactFormState.message
      ) {
        console.log("Empty fields validation failed");
        setContactFormState({
          ...contactFormState,
          formError: {
            isError: true,
            message: "Please fill out all fields.",
          },
          formSuccess: false,
        });
        return false;
      }

      if (!contactFormState.recaptchaToken) {
        console.log("reCAPTCHA validation failed");
        setContactFormState({
          ...contactFormState,
          formError: {
            isError: true,
            message: "Please complete the reCAPTCHA verification.",
          },
          formSuccess: false,
        });
        return false;
      }

      // Clear errors if all validations pass
      console.log("All validations passed");
      setContactFormState({
        ...contactFormState,
        formError: {
          isError: false,
          message: "",
        },
        formSuccess: false,
      });

      return true;
    },
    [contactFormState, hasAttemptedSubmit]
  );

  // Validate form fields when debounced values change, but only after first submission
  useEffect(() => {
    if (
      hasAttemptedSubmit &&
      (debouncedName || debouncedEmail || debouncedMessage)
    ) {
      validateForm(true);
    }
  }, [
    debouncedName,
    debouncedEmail,
    debouncedMessage,
    debouncedToken,
    hasAttemptedSubmit,
    validateForm,
  ]);

  async function handleContactForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    // Mark that user has attempted to submit
    setHasAttemptedSubmit(true);

    // Validate form before submission
    const isValid = validateForm();

    // If validation fails, don't proceed with submission
    if (!isValid) {
      return;
    }

    // Set loading state only if validation passes
    setContactFormState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch("/api/contact-form-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactFormState.name,
          email: contactFormState.email,
          message: contactFormState.message,
          recaptchaToken: contactFormState.recaptchaToken,
        }),
      });

      if (res.status === 200) {
        setContactFormState({
          ...contactFormState,
          name: "",
          email: "",
          message: "",
          recaptchaToken: null,
          formSuccess: true,
          formError: { isError: false, message: "" },
        });
        // Reset the submission attempt flag on success
        setHasAttemptedSubmit(false);
      } else {
        const errorData = await res.json();
        setContactFormState({
          ...contactFormState,
          formError: {
            isError: true,
            message:
              errorData.error ||
              "Something went wrong. Please try again later.",
          },
          formSuccess: false,
        });
      }
    } catch (error) {
      setContactFormState({
        ...contactFormState,
        formError: {
          isError: true,
          message: "Something went wrong. Please try again later.",
        },
        formSuccess: false,
      });
    } finally {
      setContactFormState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  const handleRecaptchaVerify = (token: string | null) => {
    setContactFormState({
      ...contactFormState,
      recaptchaToken: token,
    });
  };

  return (
    <div className="block md:w-2/3 p-8 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
      <form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
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
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
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
            className="block mb-2 text-sm font-medium text-white"
          >
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            cols={40}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
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

        <RecaptchaCheckbox onVerify={handleRecaptchaVerify} />

        <button
          type="submit"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition-colors duration-200"
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
