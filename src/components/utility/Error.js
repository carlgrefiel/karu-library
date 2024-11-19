"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { text } from "./style";

export default function ErrorPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.refresh(); // Refresh the page
    router.back(); // Go back to the previous page
  };

  return (
    <>
      <div className="bg-gradient-to-tl from-green-300 to-green-700 h-svh flex flex-col justify-center items-center">
        <div className="flex flex-col w-[300px] h-auto justify-between border border-gray-800 bg-white rounded-xl p-10">
          <div className="items-center flex flex-col gap-3">
            <Image
              src="/assets/svg/error.svg"
              alt="error"
              width="100"
              height="100"
              className="mb-1"
            />
            <span className={`${text.xl} font-bold w-full text-center`}>
              Error
            </span>
            <div className={`${text.sm} flex flex-col items-center mb-5`}>
              <p>Something went wrong!</p>
              <p>Please try again later!</p>
            </div>
          </div>

          <button
            className={` ${text.md} border p-2 rounded-full text-blue-700 font-semibold border-blue-700`}
            onClick={handleGoBack}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </>
  );
}
