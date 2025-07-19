"use client";
import React, { useState } from "react";
import Header from "./Header";
import { SecretMessage } from "@/lib/types";
import { Copy, Check } from "lucide-react";

interface Props {
  secretMessage: SecretMessage | null;
}

const SecretMessageView = ({ secretMessage }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (secretMessage) {
      await navigator.clipboard.writeText(secretMessage.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800">
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Secret Message View
          </h1>
        </div>
      </Header>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-700">
            {secretMessage ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {secretMessage.title}
                  </h2>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-gray-300 whitespace-pre-wrap flex-1">
                        {secretMessage.message}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-md hover:bg-gray-600 transition-colors duration-200 shrink-0"
                        title="Copy message"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
                  <p className="text-yellow-300 text-sm">
                    ⚠️ This message will be permanently deleted after viewing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-300 text-lg">
                  No secret message found. The message has been viewed already
                  or you have the wrong link.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretMessageView;
