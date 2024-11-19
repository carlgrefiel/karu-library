"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function DropDown({
  children,
  width = "w-44",
  autoClose = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-200 rounded px-3"
      >
        <Image
          src={`/assets/svg/ellipsis.svg`}
          alt="ellipsis"
          width="28"
          height="28"
        />
      </button>
      {isOpen && (
        <div
          onClick={() => autoClose && setIsOpen(!isOpen)}
          className={`origin-top-right absolute right-0 top-0 mt-2 ${width} rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-200`}
        >
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
            <li>
              <button
                className="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-red-400 hover:text-white rounded-br-lg rounded-bl-lg"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
