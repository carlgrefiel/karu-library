"use client";

import { DeleteChildInfo } from "@/components/services/DeleteUsersServices";
import { DeleteGadChildInfo } from "@/components/services/LearningDeleteAdminServices";
import {
  alertError,
  alertNetworkError,
  alertSuccess,
} from "@/components/utility/Alerts";
import ButtonSuccess from "@/components/utility/Button";
import { DropDownItemButton, toUpperV2 } from "@/components/utility/Inputs";
import AddChildInfoModal from "@/components/utility/modals/AddChildInfoModal";
import DropdownModal from "@/components/utility/modals/DropdownModal";
import { styles } from "@/components/utility/style";
import {
  NoDataFound,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@/components/utility/Tables";
import React, { useState } from "react";

export default function ChildrensTable({
  childrenData,
  isOpenFamilyModal,
  setIsOpenFamilyModal,
  setRefreshChild,
  validateViewing = true,
  loadingSkeleton = false,
  admin = false,
  emp_id = "",
}) {
  const [isEditChildInfoModal, setIsEditChildInfoModal] = useState({});

  const handleDeleteChildInfo = async ({ id, name }) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    try {
      if (confirmDelete) {
        (admin ? DeleteGadChildInfo : DeleteChildInfo)(id)
          .then((res) => {
            if (res.error) {
              alertError(res.message);
            } else {
              alertSuccess(`${name} Deleted successfully!`);
              setRefreshChild(true);
            }
          })
          .catch((err) => {
            alertError(err);
          });
      }
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  };
  return (
    <>
      <AddChildInfoModal
        childData={isEditChildInfoModal}
        isOpen={isOpenFamilyModal}
        setRefreshChild={setRefreshChild}
        admin={admin}
        emp_id={emp_id}
        isClose={() => {
          setIsEditChildInfoModal({});
          setIsOpenFamilyModal(false);
        }}
      />
      <div className={styles.containerPds}>
        <div className="mb-5 flex justify-between items-center">
          <label className={`${styles.labelPds} ${styles.labelHeaderPds}  `}>
            Children/s Name
          </label>
          {childrenData.length > 0 && (
            <>
              {childrenData.length <= 11 && (
                <ButtonSuccess
                  onClick={() => setIsOpenFamilyModal(true)}
                  icon="add"
                  name="Add Children"
                />
              )}
            </>
          )}
        </div>

        <TableContainer>
          <TableHead>
            <TableRow thead={true}>
              <TableCell blockBLurr className={"text-md w-2/5  "}>
                <span>Name</span>
              </TableCell>
              <TableCell blockBLurr className={"text-md"}>
                <span>Birth Date</span>
              </TableCell>
              {validateViewing && (
                <TableCell blockBLurr className={"text-md"}>
                  <span>Actions</span>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          {childrenData.length > 0 && (
            <TableBody>
              {childrenData.map(({ name, birthdate, id }, index) => (
                <TableRow key={index} rowKey={index}>
                  <TableCell>
                    <span>{toUpperV2(name)}</span>
                  </TableCell>
                  <TableCell>
                    <span>{birthdate}</span>
                  </TableCell>
                  {validateViewing && (
                    <TableCell blockBLurr>
                      <DropdownModal
                        index={index}
                        data={childrenData}
                        w={"w-32"}
                      >
                        <DropDownItemButton
                          label="Edit"
                          icon="editBlack"
                          onClick={() => {
                            setIsEditChildInfoModal({
                              id: id,
                              name: name,
                              birthdate: birthdate,
                            });
                            setIsOpenFamilyModal(true);
                          }}
                        />
                        <DropDownItemButton
                          error={true}
                          label="Delete"
                          icon="deleteBlack"
                          onClick={() =>
                            handleDeleteChildInfo({
                              id,
                              name,
                            })
                          }
                        />
                      </DropdownModal>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </TableContainer>
        <div className={styles.tableFooterStyling}>
          {!(childrenData.length > 0) && !validateViewing && <NoDataFound />}
          {!(childrenData.length > 0) && validateViewing && (
            <ButtonSuccess
              onClick={() =>
                loadingSkeleton
                  ? alertNetworkError()
                  : setIsOpenFamilyModal(true)
              }
              icon="add"
              name="Add Children"
            />
          )}
        </div>
      </div>
    </>
  );
}
