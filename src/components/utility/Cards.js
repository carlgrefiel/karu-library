"use client";

import React from "react";
import { text } from "./style";

export default function Cards({ total, label }) {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-400 rounded-xl  gap-3 w-1/3 sm:w-1/5 min-h-32 p-2">
      <span className={`${text.xxl} font-bold`}>{total}</span>
      <span className={`${text.md} text-center`}>{label}</span>
    </div>
  );
}
