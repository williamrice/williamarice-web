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

  async function handleContactForm(e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }

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
      <form
        role="form"
        aria-labelledby="contact-form-heading"
        onSubmit={(e) => {
          e.preventDefault();
          handleContactForm(e);
        }}
        noValidate
      >
        <h2 id="contact-form-heading" className="sr-only">Contact Form</h2>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Name <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
            onChange={(e) =>
              setContactFormState({ ...contactFormState, name: e.target.value })
            }
            value={contactFormState.name}
            required
            aria-required="true"
            aria-invalid={contactFormState.formError.isError && contactFormState.name.trim() === ''}
            aria-describedby={contactFormState.formError.isError && contactFormState.name.trim() === '' ? "name-error" : undefined}
          />
          {contactFormState.formError.isError && contactFormState.name.trim() === '' && (
            <div id="name-error" className="text-red-400 text-sm mt-1" role="alert">
              Name is required
            </div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Email <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            id="email"
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
            aria-required="true"
            aria-invalid={contactFormState.formError.isError && contactFormState.formError.message.includes('email')}
            aria-describedby={contactFormState.formError.isError && contactFormState.formError.message.includes('email') ? "email-error" : undefined}
          />
          {contactFormState.formError.isError && contactFormState.formError.message.includes('email') && (
            <div id="email-error" className="text-red-400 text-sm mt-1" role="alert">
              {contactFormState.formError.message}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-white"
          >
            Message <span className="text-red-400" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
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
            aria-required="true"
            aria-invalid={contactFormState.formError.isError && contactFormState.message.trim() === ''}
            aria-describedby={contactFormState.formError.isError && contactFormState.message.trim() === '' ? "message-error" : undefined}
          />
          {contactFormState.formError.isError && contactFormState.message.trim() === '' && (
            <div id="message-error" className="text-red-400 text-sm mt-1" role="alert">
              Message is required
            </div>
          )}
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
      {contactFormState.formError.isError && !contactFormState.formError.message.includes('Name') && !contactFormState.formError.message.includes('email') && !contactFormState.formError.message.includes('Message') && (
        <div className="mt-4" role="alert" aria-live="polite">
          <ErrorEmailBanner message={contactFormState.formError.message} />
        </div>
      )}
      {contactFormState.formSuccess && (
        <div className="mt-4" role="status" aria-live="polite">
          <SuccessfulEmailBanner />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
