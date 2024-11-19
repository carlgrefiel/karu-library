"use client";

import CryptoJS from "crypto-js";
import { forceLogout } from "../helpers/AxiosHelper";
import Link from "next/link";
import Image from "next/image";
import { styles } from "./style";
import { alertSuccess } from "./Alerts";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setRole, setUsers } from "@/lib/features/navSlices";
import { useUser } from "@/app/ContextProvider";
import useHandleLogout from "@/hooks/useHandleLogout";

const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const today = new Date();
export const currentDateComponent = today.toISOString().split("T")[0];
const dateSpit = currentDateComponent.split("-");
export const currentDateComponentStr = `${dateSpit[1]}${dateSpit[2]}${dateSpit[0]}`;

export const encryptText = (text) => {
  const convertedToString = `${text}`;
  const encrypted = CryptoJS.AES.encrypt(convertedToString, key).toString();
  return encodeURIComponent(encrypted);
};

export const decryptText = (text) => {
  if (!text) return ""; // Handle case when text is null or undefined
  try {
    const decryptedText = decodeURIComponent(text);
    const bytes = CryptoJS.AES.decrypt(decryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    // console.error("Error decrypting text:", error);
    forceLogout();
    return null;
  }
};

export const currentTimestamp = () => {
  const currentDateTime = new Date(); // Get current date and time
  const localDateTime = new Date(
    currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000
  ); // Adjust for local timezone
  const timestamp = localDateTime.toISOString().slice(0, 19).replace("T", " ");

  return timestamp;
};

export const SidebarMobileLinkDropdown = ({ href, pathname, label }) => {
  return (
    <Link prefetch={false} href={`${href}`} className="w-full">
      <div
        className={`${styles.navItemMobile} ${
          pathname === `${href}` ? "bg-green-500" : ""
        } justify-center items-center py-3`}
      >
        <span>{label}</span>
      </div>
    </Link>
  );
};

export const SidebarMobileLink = ({ href, pathname, icon, label }) => {
  return (
    <Link prefetch={false} href={`${href}`}>
      <div
        className={`${styles.navItemMobile} ${
          pathname === `${href}` ? "bg-green-500" : ""
        }`}
      >
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={icon}
          width="30"
          height="30"
          className="mb-1 "
        />
        <span className="pl-3 text-left">{label}</span>
      </div>
    </Link>
  );
};

export const SidebarLink = ({ href, pathname, icon, label }) => {
  return (
    <Link prefetch={false} href={href}>
      <div
        className={`${styles.navItem} ${
          pathname === `${href}` ? "bg-green-500" : ""
        }`}
      >
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={icon}
          width="30"
          height="30"
          className="mb-1 "
        />
        <span className="pl-3">{label}</span>
      </div>
    </Link>
  );
};

export const SidebarMobileNotifications = ({ pathname, section }) => {
  const { countNotif } = useUser();
  return (
    <Link prefetch={false} href={`/${section}/user/notification`}>
      <div
        className={`${styles.navItemMobile} ${
          pathname === `/${section}/user/notification` ? "bg-green-500" : ""
        }`}
      >
        <div className="relative">
          <Image
            src="/assets/svg/notification.svg"
            alt="notification"
            width="30"
            height="30"
            className="mb-1 "
          />
          {countNotif > 0 && (
            <span className="absolute flex -top-1 -right-1 w-4 h-4 justify-center items-center bg-red-400 rounded-full shadow text-[10px]">
              {countNotif}
            </span>
          )}
        </div>
        <div className="flex  justify-between  w-full items-center">
          <span className="pl-3">Notification</span>
        </div>
      </div>
    </Link>
  );
};

export const SidebarNotifications = ({ pathname, section }) => {
  const { countNotif } = useUser();
  return (
    <Link prefetch={false} href={`/${section}/user/notification`}>
      <div
        className={`${styles.navItem} ${
          pathname === `/${section}/user/notification` ? "bg-green-500" : ""
        }`}
      >
        <div className="relative">
          <Image
            src="/assets/svg/notification.svg"
            alt="notification"
            width="30"
            height="30"
            className="mb-1 "
          />
          {countNotif > 0 && (
            <span className="absolute flex -top-1 -right-1 w-4 h-4 justify-center items-center bg-red-400 rounded-full shadow text-[10px]">
              {countNotif}
            </span>
          )}
        </div>
        <div className="flex  justify-between  w-full items-center">
          <span className="pl-3">Notification</span>
        </div>
      </div>
    </Link>
  );
};

export const SidebarCertification = ({ pathname, section }) => {
  const { countRequest } = useUser();
  return (
    <Link prefetch={false} href={`/${section}/admin/certification`}>
      <div
        className={`${styles.navItem} ${
          pathname === `/${section}/admin/certification` ? "bg-green-500" : ""
        }`}
      >
        <div className="relative">
          <Image
            src="/assets/svg/certification.svg"
            alt="certification"
            width="35"
            height="35"
            className="mb-1 "
          />
          {countRequest.total_request > 0 && (
            <span className="absolute flex -top-1 -right-1 w-4 h-4 justify-center items-center bg-red-400 rounded-full shadow text-[10px]">
              {countRequest.total_request}
            </span>
          )}
        </div>
        <div className="flex  justify-between  w-full items-center">
          <span className="pl-3">Certification</span>
        </div>
      </div>
    </Link>
  );
};

export const SidebarLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = useHandleLogout();

  // const handleLogout = () => {
  //   alertSuccess("Logout successfully");
  //   forceLogout();
  //   dispatch(setRole(null));
  //   setTimeout(() => {
  //     router.replace("/");
  //   }, 1000);

  //   setTimeout(() => {
  //     dispatch(setUsers(null));
  //   }, 2000);
  // };
  return (
    <div
      onClick={handleLogout}
      className={`${styles.navItem} cursor-pointer hover:bg-red-400 hover:text-white`}
    >
      <Image src="/assets/svg/logout.svg" alt="logout" width="30" height="30" />
      <span className="pl-3">Log Out</span>
    </div>
  );
};

export const convertToText = (str) => {
  return str
    .split("_") // Split the string by underscores
    .join(" "); // Join the words with spaces
};

export const verifyPassword = (password) => {
  // verify password and return true if all validation is meant
  const validationsPassword = {
    hasUpperCase: (value) => /[A-Z]/.test(value),
    hasLowerCase: (value) => /[a-z]/.test(value),
    hasNumber: (value) => /\d/.test(value),
    hasSpecialChar: (value) => /[@$!%*?&]/.test(value),
    minLength: (value) => value.length >= 8,
  };
  return (
    validationsPassword.hasUpperCase(password) &&
    validationsPassword.hasLowerCase(password) &&
    validationsPassword.hasNumber(password) &&
    validationsPassword.hasSpecialChar(password) &&
    validationsPassword.minLength(password)
  );
};
