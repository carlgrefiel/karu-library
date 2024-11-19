"use client";

import Spinner from "@/components/utility/Spinners";
import RegisterModal from "@/components/utility/modals/RegisterModal";
import {
  selectLoadingSession,
  selectResendDisabled,
} from "@/lib/features/navSlices";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Congratulations from "./announcement/Congratulations";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";
import { decryptText } from "./utilsV2";

export default function SpinnerAndRegisterComponent({ section }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const select = decryptText(searchParams.get("select"));
  const forgot = decryptText(searchParams.get("forgot"));
  const [processing, setProcessing] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const loadingSession = useAppSelector(selectLoadingSession);
  const resendDisabled = useAppSelector(selectResendDisabled);

  return (
    <>
      {select === "true" && (
        <RegisterModal
          section={section}
          isOpen={select}
          isClose={() => {
            router.push(pathname);
          }}
          setProcessing={setProcessing}
          processing={processing}
          setRegistered={setRegistered}
        />
      )}

      {forgot === "true" && (
        <ForgotPasswordModal
          isOpen={forgot}
          isClose={() => {
            router.push(pathname);
          }}
          setProcessing={setProcessing}
          processing={processing}
          setChangePassword={setChangePassword}
        />
      )}
      <Spinner name={"Processing..."} loading={processing} />
      <Spinner
        name={"Loading Session..."}
        loading={
          processing || forgot || select || resendDisabled
            ? false
            : loadingSession
        }
      />
      <Congratulations
        isClose={() => {
          setRegistered(false);
          setChangePassword(false);
        }}
        isOpen={registered || changePassword}
        description={`${
          changePassword
            ? "Your password has been successfully updated, and your new password has been sent to the email you provided."
            : "You have been successfully registered on the PHRMDO portal, and your initial password has been sent to the email you provided during registration."
        }`}
      />
    </>
  );
}
