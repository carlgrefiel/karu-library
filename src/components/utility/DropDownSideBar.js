"use client";

import Image from "next/image";
import React, { useState } from "react";
import { styles } from "./style";

export default function DropDownSideBar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
        <div className={`${styles.navItem} `}>
          <Image
            src="/assets/svg/application.svg"
            alt="application"
            width="30"
            height="30"
            className="mb-1 "
          />
          <span className="pl-3">Applications</span>
          <Image
            src={`/assets/svg/${isOpen ? "nextWhite" : "arrowDown"}.svg`}
            alt="application"
            width="20"
            height="20"
            className="ml-5 "
          />
        </div>
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className={`origin-top-right z-20 absolute -right-[170px] top-0 mt-2 w-[200px] rounded shadow-lg bg-gray-400 ring-1 ring-black ring-opacity-5 border border-gray-500`}
        >
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            className="divide-y-2"
          >
            {children}
          </ul>
        </div>
      )}
    </>
  );
}
