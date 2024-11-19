"use client";

import React from "react";
import { styles, text } from "./style";
import { User } from "heroicons-react";
import { InputPassword, valUsername } from "./Inputs";
import Recaptcha from "./Recaptcha";
import ButtonSuccess from "./Button";
import Link from "next/link";
import { VerifyToken } from "../services/AuthService";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UsersLogin } from "@/components/services/AuthService";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLoadingSession,
  setChangePassword,
  setLoadingSession,
  setRole,
  setUsers,
} from "@/lib/features/navSlices";
import {
  alertError,
  alertNetworkError,
  alertWarning,
} from "@/components/utility/Alerts";
import { encryptText, verifyPassword } from "@/components/utility/utilsV2";
import { useUser } from "@/app/ContextProvider";
import InvalidEmpStatus from "./announcement/InvalidEmpStatus";

export default function LoginComponent({
  title,
  validationsSectionArray,
  defaultSectionID,
}) {
  const dispatch = useAppDispatch();
  const { setRefreshNotif } = useUser();
  const loading = useAppSelector(selectLoadingSession);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [token, setToken] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isOpenInvalid, setIsOpenInvalid] = useState(false);

  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const roleMap = {
    1: "admin",
    3: "phrmdo",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (verifyPassword(data?.password)) {
      dispatch(setChangePassword(false));
    } else {
      dispatch(setChangePassword(true));
    }
    if (!submitEnabled) {
      return alertWarning("reCAPTCHA is required!");
    }

    try {
      setInvalidCredentials(false);
      dispatch(setLoadingSession(true));
      const updatedData = { token, ...data };
      UsersLogin(updatedData)
        .then((res) => {
          if (!res.error) {
            if (
              (validationsSectionArray.includes(res?.data?.section_id) &&
                res?.data?.role_id === 1) ||
              [3].includes(res?.data?.role_id)
            ) {
              const validationRecords =
                validationsSectionArray.includes(2) && res?.data?.role_id === 2
                  ? res?.data?.insider === 1 && res.data.emp_id
                  : true;
              if (validationRecords) {
                const section_id = [2, 3].includes(res?.data?.role_id)
                  ? defaultSectionID
                  : res?.data?.section_id;
                setRefreshNotif(true);
                dispatch(
                  setUsers({
                    id: encryptText(`${res?.data?.id}`),
                    role_id: encryptText(`${res?.data?.role_id}`),
                    username: encryptText(`${res?.data?.username}`),
                    fullname: encryptText(`${res?.data?._fullname}`),
                    section_id: encryptText(`${section_id}`),
                  })
                );
                dispatch(
                  setRole(encryptText(roleMap[parseInt(res?.data?.role_id)]))
                );
              } else {
                setInvalidCredentials(true);
                dispatch(setLoadingSession(false));
                setIsOpenInvalid(true);
              }
            } else {
              setInvalidCredentials(true);
              dispatch(setLoadingSession(false));
              alertError(
                "Your account is not authorized to access this portal. Please contact the PHRMDO portal administrator for assistance."
              );
            }
          } else {
            dispatch(setLoadingSession(false));
            if (res?.message === "$$passive") {
              alertError(
                "Your account is deactivated! Please contact the PHRMDO Portal admin"
              );
            } else if (res?.message === "User not found") {
              alertError("User not found, Please try again!");
            } else {
              alertNetworkError();
            }
            setInvalidCredentials(true);
            setTimeout(() => {}, 3000);
          }
        })
        .catch((err) => {
          dispatch(setLoadingSession(false));
        });
    } catch (error) {
      // Handle errors if needed

      console.error(error);
    }
  };

  const handleToken = async (token) => {
    setToken(token);
    setSubmitEnabled(true);
  };

  return (
    <>
      <InvalidEmpStatus
        isOpen={isOpenInvalid}
        isClose={() => {
          setIsOpenInvalid(false);
        }}
      />
      <div className="flex items-center justify-center mb-2  p-2 mx-auto ">
        <Image
          src="/assets/svg/BoholLogo.svg"
          alt="logo"
          width="60"
          height="60"
        />
        <span className={`${text.xl} font-semibold text-black ml-2  w-1/2`}>
          {title}
        </span>
      </div>
      <form
        className={`flex flex-col gap-3 w-full py-3`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="username" className={`${text.md}  font-medium`}>
            Username
          </label>
          <div
            className={`flex items-center border ${
              errors.username
                ? styles.borderError
                : invalidCredentials
                ? styles.borderError
                : styles.border
            } rounded`}
          >
            <User className="w-6 h-6 text-green-500 mx-2" />
            <input
              type="text"
              name="username"
              id="username"
              {...register("username", {
                required: "Username is required",
                validate: valUsername,
              })}
              className="w-full  p-2 bg-transparent outline-none"
            />
          </div>
          {errors.username && (
            <p className={`text-red-600 ${text.sm}`}>
              {errors.username.message}
            </p>
          )}
        </div>
        <InputPassword
          login={true}
          label={`Password`}
          invalidCredentials={invalidCredentials}
          errors={errors.password}
          register={register}
          name="password"
        />
        <div className="flex justify-end">
          <Link
            href={`?forgot=${encryptText("true")}`}
            className={`text-blue-600 font-medium hover:underline py-2 ${text.md}`}
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Recaptcha sitekey={`${sitekey}`} callback={handleToken} />
        </div>

        <div className="flex flex-col items-center justify-center mt-3">
          <ButtonSuccess
            type="submit"
            name={loading ? "Loading..." : "Login"}
            icon="login"
            hidden={false}
          />
          <Link
            href={`/`}
            className={`${text.md} flex justify-center items-center w-1/2 mt-3 text-green-700 hover:underline py-2 px-5 rounded-full`}
          >
            Back
          </Link>
        </div>
      </form>
    </>
  );
}
