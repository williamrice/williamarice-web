"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SecretMessage } from "@/lib/types";

interface Props {
  secretMessage: SecretMessage | null;
}

const SecretMessageView = ({ secretMessage }: Props) => {
  console.log(secretMessage);

  return (
    <div className="min-h-[1200px]">
      <Header>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="lg:text-6xl text-4xl font-bold text-center text-white">
            Secret Message View
          </h1>
        </div>
      </Header>
      <div className="flex justify-center p-8">
        {secretMessage ? (
          <div>
            <p>{secretMessage.title}</p>
            <p>{secretMessage.message}</p>
          </div>
        ) : (
          <p>
            No secret message found. It has already been used or you have the
            wrong link.
          </p>
        )}
      </div>
    </div>
  );
};

export default SecretMessageView;
