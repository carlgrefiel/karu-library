"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function PageNotFound({ setCheckConditions }) {
  const router = useRouter();
  return (
    <>
      <div className="bg-gradient-to-tl from-green-300 to-green-700 h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col w-[300px] h-[320px] justify-between  border border-gray-800  bg-white rounded-xl p-10">
          <div className=" items-center flex flex-col gap-3">
            <Image
              src="/assets/svg/page-not-found.svg"
              alt="page-not-found"
              width="100"
              height="100"
              className="mb-1 "
            />
            <div className="flex flex-col">
              <span className=" text-xl font-bold w-full text-center">
                Oops...
              </span>
              <span className=" text-xl font-bold w-full text-center">
                Page not found!
              </span>
            </div>
            <p className="text-sm mb-2">Please check your URL.</p>
          </div>

          <button
            className="border p-2 rounded-full text-blue-700 font-semibold border-blue-700 "
            onClick={() => {
              router.push("/");
              setTimeout(() => {
                setCheckConditions(false);
              }, 2000);
            }}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </>
  );
}
