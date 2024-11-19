"use client";

import React from "react";
import { styles, text } from "./style";
import Image from "next/image";

export default function Spinner({ name, loading }) {
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 h-svh w-screen bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="flex justify-center items-center text-white font-bold bg-gradient-to-tl from-green-300 to-green-700 p-8 sm:p-10 border border-white rounded ">
            <Image
              src={`/assets/svg/refreshWhite.svg`}
              alt="refresh"
              width="50"
              height="50"
              className="animate-spin mr-3"
            />

            <div className={`${text.lg}`}>{name}</div>
          </div>
        </div>
      )}
    </>
  );
}
