"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { User } from "heroicons-react";
import { usePathname, useRouter } from "next/navigation";
import { RegisterUserAccount } from "@/components/services/UsersService";
import { useAppSelector } from "@/lib/hooks";
import { selectRole } from "@/lib/features/navSlices";
import { VerifyToken, getUsername } from "@/components/services/AuthService";
import Input, {
  InputPassword,
  Select,
  validationForLetters,
  valUsername,
} from "@/components/utility/Inputs";
import { useDebounce } from "use-debounce";

import { styles } from "@/components/utility/style";
import {
  alertError,
  alertSuccess,
  alertWarning,
} from "@/components/utility/Alerts";
import { decryptText } from "@/components/utility/utilsV2";
import Recaptcha from "@/components/utility/Recaptcha";

export default function RegisterForm({ roleData, setRefreshUsers }) {
  const router = useRouter();
  const pathname = usePathname();
  const role = decryptText(useAppSelector(selectRole));
  const [loading, setLoading] = useState(false);
  const [errUsername, setErrUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [search_term] = useDebounce(username, 1000);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [token, setToken] = useState("");
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!submitEnabled) {
      return alertWarning("reCAPTCHA is required!");
    }

    const employment_status = 1;
    const insiderData = { ...data, token, employment_status };

    if (errUsername) {
      return alertWarning("Username already exists!");
    }
    try {
      setLoading(true);
      // Register here:
      RegisterUserAccount(insiderData)
        .then((res) => {
          if (res.error) {
            alertError("Error!, Please try again!");
            setLoading(false);
          } else {
            if (res.message === "user exists") {
              alertError("User already exist. Please contact PHRMDO admin!");
            } else {
              alertSuccess(`${data.username} Registered successfully!`);
              setLoading(false);
              router.push(pathname);
              setRefreshUsers(true);
            }
          }
        })
        .catch((err) => {
          alertError(err);
          setLoading(false);
        });
    } catch (error) {
      // Handle errors if needed
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const handleToken = async (token) => {
    setSubmitEnabled(true);
    setToken(token);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search_term) {
        try {
          const updatedData = { search_term };
          const res = await getUsername(updatedData);
          const usernames = res?.data?.result0 || [];
          const validUsernames =
            usernames?.map((user) => user.username.toLowerCase()) || [];
          setErrUsername(validUsernames.includes(username.toLowerCase()));
        } catch (err) {
          console.log("$$error");
        }
      } else {
        setErrUsername(false);
      }
    };

    fetchData();
  }, [search_term]);

  const handleUsernameChange = (e) => {
    const enteredUsername = e.target.value.trim();
    if (enteredUsername) {
      setUsernameEmpty(false);
    } else {
      setUsernameEmpty(true);
    }

    setUsername(enteredUsername);
  };

  return (
    <>
      <div className="w-full">
        <div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="First Name"
              errors={errors.firstname}
              register={register}
              name="firstname"
              required={true}
              pattern={{
                value: validationForLetters,
                message: "Please enter only letters",
              }}
            />

            <Input
              label="Middle Name"
              errors={errors.middlename}
              register={register}
              name="middlename"
              pattern={{
                value: validationForLetters,
                message: "Please enter only letters",
              }}
            />
            <Input
              label="Last Name"
              errors={errors.lastname}
              register={register}
              name="lastname"
              required={true}
              pattern={{
                value: validationForLetters,
                message: "Please enter only letters",
              }}
            />
            <Input
              type="date"
              label="Birth Date"
              errors={errors.birthdate}
              register={register}
              name="birthdate"
              required={true}
            />
            <Input
              type="email"
              label="Email Address"
              errors={errors.email}
              register={register}
              name="email"
              required={true}
            />

            <Select
              label="Role"
              errors={errors.role_id}
              register={register}
              name="role_id"
              required={true}
            >
              <option hidden={true} value="">
                Select Role
              </option>
              <option value={1}>{roleData[1]?.name}</option>
              <option value={2}>{roleData[2]?.name}</option>
              {role === "phrmdo" && (
                <option value={3}>{roleData[3]?.name}</option>
              )}
            </Select>
            <Select
              label="Section"
              errors={errors.section_id}
              register={register}
              name="section_id"
              required={true}
            >
              <option hidden={true} value="">
                Select Section
              </option>
              <option value={3}>Learning And Development</option>
              <option value={2}>Records</option>
              <option value={1}>RSP</option>
            </Select>

            <div className="flex flex-col gap-2 ">
              <label htmlFor="username" className="text-md  font-medium">
                Username
                <span className="text-red-600 text-lg px-1">{"*"}</span>
              </label>
              <div
                className={`flex items-center border ${
                  errUsername || errors.username
                    ? styles.borderError
                    : usernameEmpty
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
                    validate: valUsername,
                  })}
                  onChange={handleUsernameChange}
                  className="w-full p-2 bg-transparent outline-none"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
              {errUsername && (
                <span className={`${styles.inputError}`}>
                  Username already exists!
                </span>
              )}
            </div>
            <InputPassword
              label={`Password`}
              errors={errors.password}
              register={register}
              name="password"
            />
            <div className="w-full flex  h-[80px] mt-3">
              <Recaptcha sitekey={`${sitekey}`} callback={handleToken} />{" "}
            </div>
            <div className="flex flex-col items-center justify-center mt-3">
              <button
                onClick={() => {
                  setUsernameEmpty(!username);
                }}
                type="submit"
                className=" flex justify-center items-center w-1/2 bg-gradient-to-tl from-green-300 to-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded-full"
              >
                <span>{loading ? <>Loading...</> : <>Submit</>}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
