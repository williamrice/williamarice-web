"use client";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";

type Inputs = {
  title: string;
  message: string;
};

const SecretMessageForm = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: Inputs) => {
    try {
      setIsLoading(true);
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
      setUrl(data.url);
    } catch (error) {
      console.error("Error adding secret message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const handleCopy = async () => {
    if (url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 rounded-lg shadow-md p-6 md:p-8 space-y-6 relative border border-gray-700"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/80 rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-gray-300">Creating your secret message...</p>
            </div>
          </div>
        )}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Title
          </label>
          <input
            {...register("title", { required: true })}
            id="title"
            type="text"
            placeholder="Enter a title for your message"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-red-600 text-sm">Title is required</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message
          </label>
          <textarea
            {...register("message", { required: true })}
            id="message"
            rows={6}
            placeholder="Enter your secret message"
            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          {errors.message && (
            <p className="text-red-600 text-sm">Message is required</p>
          )}
        </div>

        <div className="pt-4">
          <SubmitButton loading={isLoading} />
        </div>
      </form>

      {url && (
        <div className="mt-8 bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            Your Secret Message Link
          </h3>
          <div className="flex items-center space-x-2 bg-gray-700 rounded-md p-3 border border-gray-600">
            <p className="text-gray-300 flex-1 truncate">{url}</p>
            <button
              onClick={handleCopy}
              className="p-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-300">
            <p>
              ⚠️ This link will only work once. Do not test it or the message
              will be permanently deleted.
            </p>
            <p>
              Share this link with others to allow them to view your secret
              message.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretMessageForm;
