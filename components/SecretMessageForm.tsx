"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { Copy } from "lucide-react";

type Inputs = {
  title: string;
  message: string;
};

const SecretMessageForm = () => {
  const [url, setUrl] = useState<string | null>(null);
  const onSubmit = async (formData: Inputs) => {
    try {
      const response = await fetch(
        "https://secret.williamarice.com/api/Secret",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add secret message");
      }
      const data = await response.json();
      console.log(data);
      setUrl(data.url);
    } catch (error) {
      console.error("Error adding secret message:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 shadow-md p-4 md:p-6 lg:p-8"
      >
        <div className="group relative w-72 md:w-80 lg:w-96">
          <label
            htmlFor="title"
            className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
          >
            Title
          </label>
          <input
            {...register("title", { required: true })}
            id="title"
            type="text"
            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
          />
        </div>
        {errors.title && <span>This field is required</span>}

        <div className="group relative w-72 md:w-80 lg:w-96">
          <label
            htmlFor="message"
            className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
          >
            Message
          </label>
          <textarea
            {...register("message", { required: true })}
            id="message"
            rows={4}
            className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg"
          />
        </div>
        {errors.message && <span>This field is required</span>}

        <div className="mt-4">
          <SubmitButton loading={isSubmitting} />
        </div>
      </form>
      <div>
        {url && (
          <div className="mt-4 flex flex-col justify-center">
            <div className="flex items-center">
              <p>Your secret message url was created. Click to copy... </p>
              <Copy
                onClick={() => navigator.clipboard.writeText(url)}
                className="ml-2 cursor-pointer hover:text-blue-700 hover:scale-110 transition-all ease-in-out"
              />
            </div>
            <p>
              You can share this url with others to allow them to view your
              secret message.
            </p>
            <p> It only works one time. Do not test it or it will go away.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretMessageForm;
