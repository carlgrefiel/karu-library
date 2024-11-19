"use client";

import { useUser } from "@/app/ContextProvider";
import Image from "next/image";
import React from "react";
import { text } from "./style";

export default function ButtonSuccess({
  search = false,
  type = "button",
  onClick,
  name,
  icon = "save",
  className = "px-4 py-2",
  hidden = true,
  noIcon = false,
  nolabel = false,
  iconSize = "20",
  ...props
}) {
  const { isMobile } = useUser();
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`${
        text.md
      } gap-2 flex justify-center items-center bg-gradient-to-tl from-green-400 to-green-800  text-white h-10  ${className} ${
        !search
          ? "rounded-lg hover:from-pink-500 hover:to-yellow-500"
          : "rounded h-[38px]  my-auto mr-[1px]"
      }`}
    >
      {!noIcon && (
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={icon}
          width={iconSize}
          height={iconSize}
        />
      )}
      {(!hidden ? true : isMobile) ? `${!nolabel ? name : ""}` : ""}
    </button>
  );
}

export function ButtonError({
  type = "button",
  onClick,
  name,
  icon = "close",
  className = "px-4 py-2",
  ...props
}) {
  const { isMobile } = useUser();
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`${text.md} flex justify-center items-center bg-gradient-to-tl from-red-500 to-red-800 hover:from-pink-500 hover:to-yellow-500 text-white h-10 ${className} rounded-lg gap-2`}
    >
      <Image
        src={`/assets/svg/${icon}.svg`}
        alt={icon}
        width="20"
        height="20"
      />
      {isMobile && name}
    </button>
  );
}

export function ButtonInfo({
  type = "button",
  onClick,
  name,
  icon = "edit",
  className = "px-4 py-2",
  hidden = true,
  isDirty = false,
  ...props
}) {
  const { isMobile } = useUser();
  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`${
        text.md
      } flex justify-center items-center bg-gradient-to-tl ${
        isDirty ? "from-green-400 to-green-800" : "from-blue-500 to-blue-800"
      } hover:from-pink-500 hover:to-yellow-500 text-white ${className} rounded-lg gap-2 `}
    >
      <Image
        src={`/assets/svg/${icon}.svg`}
        alt={icon}
        width="20"
        height="20"
      />
      {(!hidden ? true : isMobile) ? name : ""}
    </button>
  );
}

export function ButtonClose({
  onClick,
  name,
  icon = "close",
  text = "text-white",
  size = "30",
  iconHidden = false,
  hidden = true,
}) {
  const { isMobile } = useUser();
  return (
    <button
      onClick={onClick}
      className={`${text.md} flex justify-center items-center hover:bg-red-500 ${text} font-bold py-1 px-2 rounded hover:text-white`}
    >
      {!iconHidden && (
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={icon}
          width={size}
          height={size}
          className=""
        />
      )}
      {(!hidden ? true : isMobile) ? name : ""}
    </button>
  );
}

export function ButtonTransfarent({
  onClick,
  name,
  icon = "printerBlack",
  size = "20",
  hidden = true,
  noIcon = false,
}) {
  const { isMobile } = useUser();
  return (
    <button
      className={`${text.md} flex w-full gap-2 p-2 justify-center hover:bg-gray-300 rounded`}
      onClick={onClick}
    >
      {!noIcon && (
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={icon}
          width={size}
          height={size}
          className=""
        />
      )}
      {(!hidden ? true : isMobile) ? name : ""}
    </button>
  );
}
