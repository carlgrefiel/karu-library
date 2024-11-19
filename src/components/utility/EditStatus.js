"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonSuccess, { ButtonClose, ButtonError } from "./Button";
import { toUpperV2 } from "./Inputs";
import { UpdateApplicationAppliedStatus } from "../services/PostAdminServices";
import { alertSuccess } from "./Alerts";
import { UpdateNotifications } from "../services/PostUsersServices";
import { currentTimestamp } from "./utilsV2";
import { SendEmail } from "../services/EmailServices";

export default function EditStatus({ isOpen, isClose, data, setFetchAgain }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        setShowSpinner(true);
      }, 500);
    } else {
      setShowSpinner(false);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  const handleSubmitStatus = ({ text, reciever_id }) => {
    const status = text;
    const application_applied_id = data?.id;
    const updatedData = { application_applied_id, status };
    const notificationData = {
      header: `Application ${text}`,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      sender_id: data?.sender_id,
      receiver_id: data?.receiver_id,
      receiver_email: data?.email,
      timestamp: currentTimestamp(),
    };
    try {
      UpdateApplicationAppliedStatus(updatedData).then((res) => {
        console.log(res);
        if (!res.error) {
          UpdateNotifications(notificationData);
          SendEmail(notificationData);
          alertSuccess("Updated successfully!");
          setFetchAgain(true);
          isClose();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showSpinner && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="flex flex-col w-[500px] justify-between  border border-gray-400  bg-white rounded-xl p-2 pb-5">
            <div className="flex justify-end">
              <ButtonClose
                onClick={() => {
                  isClose();
                }}
                size="25"
                icon="closeBlack"
              />
            </div>
            <div className="justify-evenly items-center flex flex-col gap-3 px-10 py-5">
              <Image
                src="/assets/svg/edit_status.svg"
                alt="celebration"
                width="100"
                height="100"
                className="mb-1 "
              />
              <span className=" text-xl font-bold w-full text-center">
                {["Approved", "Declined"].includes(data.status)
                  ? "You already responded"
                  : toUpperV2(data?.name)}
              </span>
              <p className="text-sm mb-2 text-justify ">
                {["Approved", "Declined"].includes(data.status)
                  ? "Your response is sent via email. "
                  : "Please select response to notify the applicant via email."}
              </p>

              <div className="flex justify-evenly w-full">
                {["Approved", "Declined"].includes(data.status) ? (
                  <ButtonClose
                    onClick={() => {
                      isClose();
                    }}
                    // size="25"
                    icon="backBlack"
                    name={"Back"}
                    size="20"
                    text="text-black"
                  />
                ) : (
                  <>
                    <ButtonError
                      onClick={() => {
                        handleSubmitStatus({ text: "Declined" });
                      }}
                      name={"Decline"}
                    />
                    <ButtonSuccess
                      onClick={() => {
                        handleSubmitStatus({ text: "Approved" });
                      }}
                      name={"Approved"}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
