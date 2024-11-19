"use client";

import React, { useEffect, useState } from "react";
import DropdownModal from "./modals/DropdownModal";
import Link from "next/link";
import { decryptText, encryptText } from "./utilsV2";
import Image from "next/image";
import { styles } from "./style";
import { NoDataFound } from "./Tables";
import { formatTimeAgo } from "./dateFormat";
import { DeleteNotification } from "../services/DeleteUsersServices";
import { useUser } from "@/app/ContextProvider";
import { alertError, alertSuccess } from "./Alerts";
import { DropDownItemButton, DropDownItemLink, toUpperV2 } from "./Inputs";
import { UpdateNotificationsView } from "../services/PostUsersServices";
import { useSearchParams } from "next/navigation";

export default function NotificationComponent({
  section,
  searchData,
  py = "2",
}) {
  const { setRefreshNotif, notificationData } = useUser();
  const searchParams = useSearchParams();
  const view = decryptText(searchParams.get("view"));
  const search = searchParams.get("search");

  const handleDeleteNotification = async ({ id, header }) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${header}?`
    );
    try {
      if (confirmDelete) {
        DeleteNotification(id)
          .then((res) => {
            if (res.error) {
              alertError(res.message);
            } else {
              alertSuccess(`${toUpperV2(header)} Deleted successfully!`);
              setRefreshNotif(true);
            }
          })
          .catch((err) => {
            console.log(err);
            alertError("Something went wrong. Please try again later!");
          });
      }
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  };

  useEffect(() => {
    if (!view) {
      return;
    }
    try {
      UpdateNotificationsView(view).then((res) => {
        if (!res.error) {
          setRefreshNotif(true);
        }
      });
    } catch (err) {
      // console.log(err);
    }
  }, [view]);

  return (
    <>
      <div className="flex flex-col h-full w-full overflow-y-auto divide-y-2 divide-gray-300 ">
        {(search ? searchData : notificationData).map(
          ({ header, body, viewed, id, timestamp }, index) => (
            <div
              key={index}
              className={`flex pl-4 pr-2 py-${py} hover:bg-gray-100  cursor-default justify-between`}
            >
              <div className="flex flex-col text-black w-3/4 justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      viewed === 0 ? "font-bold" : ""
                    } text-[15px] overflow-ellipsis overflow-hidden text-nowrap`}
                  >
                    {header}
                  </span>
                  <span
                    className={` text-[11px] overflow-ellipsis overflow-hidden text-nowrap `}
                  >
                    {formatTimeAgo(timestamp)}
                  </span>
                </div>
                <span
                  className={`${
                    viewed === 0 ? "font-bold" : ""
                  } text-[12px] overflow-ellipsis overflow-hidden text-nowrap `}
                >
                  {body}
                </span>
              </div>
              <DropdownModal
                index={index}
                data={notificationData}
                w={"w-32"}
                right={"-right-0"}
              >
                <DropDownItemLink
                  label={"  View"}
                  icon={"viewBlack"}
                  href={
                    search
                      ? `/${section}/user/notification?search=${search}&view=${encryptText(
                          `${id}`
                        )}`
                      : `/${section}/user/notification?view=${encryptText(
                          `${id}`
                        )}`
                  }
                />
                <DropDownItemButton
                  error={true}
                  label={"Delete"}
                  icon={"deleteBlack"}
                  onClick={() => {
                    handleDeleteNotification({ id, header });
                  }}
                />
              </DropdownModal>
            </div>
          )
        )}
        {!((search ? searchData : notificationData).length > 0) && (
          <div className="flex h-full w-full">
            <NoDataFound label="No notification" />
          </div>
        )}
      </div>
    </>
  );
}
