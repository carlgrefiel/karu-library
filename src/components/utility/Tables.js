"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { styles, text } from "./style";
import { useBlurrStyle } from "@/hooks/useBlurrStyle";

export function TableRow({
  children,
  rowKey,
  className,
  onClick,
  onDoubleClick,
  thead = false,
  table = true,
}) {
  return (
    <>
      {table ? (
        <tr
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          key={rowKey}
          className={`${className} ${rowKey % 2 === 1 ? "bg-gray-100" : ""}  ${
            thead ? "" : ` hover:bg-green-200 hover:text-black `
          } ${(onClick || onDoubleClick) && "cursor-pointer"}`}
        >
          {children}
        </tr>
      ) : (
        <></>
      )}
    </>
  );
}

export function TableHead({ children, className, table = true }) {
  return (
    <>
      {table ? (
        <thead
          className={`${className} border-r-2 border-l-2 divide-x-2 bg-gray-300 `}
        >
          {children}
        </thead>
      ) : (
        <></>
      )}
    </>
  );
}

export function TableBody({ children, className, table = true }) {
  return (
    <>
      {table ? (
        <tbody className={`${className} divide-y-2 overflow-x-auto`}>
          {children}
        </tbody>
      ) : (
        <div className={`${className} divide-y-2 overflow-x-auto`}>
          {children}
        </div>
      )}
    </>
  );
}

export function TableContainer({ children, className, table = true }) {
  return (
    <>
      {table ? (
        <table className={`w-full`}>{children}</table>
      ) : (
        <div className={`w-full`}>{children}</div>
      )}
    </>
  );
}

export function Table({ children, className }) {
  return (
    <div
      className={` ${className} flex flex-col justify-center bg-white  p-5 mx-auto `}
    >
      {children}
    </div>
  );
}

export function NoDataFound({ NoData, label = "No data found" }) {
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoData(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNoData && !NoData && (
        <div className="flex flex-col justify-center bg-white mx-auto">
          <div className="border bg-gray-400 p-5 rounded text-white font-semibold flex justify-center items-center flex-col">
            <Image
              src={`/assets/svg/noDataFound.svg`}
              alt="NoDataFound"
              width="40"
              height="40"
            />
            {label}
          </div>
        </div>
      )}
    </>
  );
}

export function SelectNotification() {
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoData(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNoData && (
        <div className="flex flex-col justify-center bg-white mx-auto">
          <div className="border bg-gray-400 p-5 rounded text-white font-semibold flex justify-center items-center flex-col">
            <Image
              src={`/assets/svg/select.svg`}
              alt="select"
              width="60"
              height="60"
            />
            Please select notification!
          </div>
        </div>
      )}
    </>
  );
}

export function TableCell({
  children,
  className,
  classDiv,
  header = false,
  blockBlurr = false,
}) {
  const { blurr } = useBlurrStyle();
  return (
    <td className={`p-3 ${className} ${header && "text-center"}`}>
      <div
        className={`flex items-center tabular-nums ${text.md} ${
          header && "justify-center"
        } ${classDiv} ${!blockBlurr && blurr}`}
      >
        {children}
      </div>
    </td>
  );
}

export default function TablePagination({
  children,
  includeAll = false,
  rowsPerPage,
  setRowsPerPage,
  showPerPage = true,
  page,
  setPage,
  disabledNextPageButton,
}) {
  const handleLimitChange = (e) => {
    setPage(0);
    setRowsPerPage(e.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <>
      {children}
      <div className="flex flex-col sm:flex-row gap-5 justify-between items-center p-4 font-bold">
        <div className={`flex flex-col sm:flex-row sm:gap-5 ${text.md}`}>
          <div>Page : {page}</div>
          {showPerPage && (
            <div>
              Row per Page :{" "}
              <select
                className="px-3 border-2 border-gray-400 rounded"
                value={rowsPerPage}
                onChange={handleLimitChange}
              >
                <option value={10}>{10}</option>
                <option value={25}>{25}</option>
                <option value={50}>{50}</option>
                {includeAll && <option value={0}>All</option>}
              </select>
            </div>
          )}
        </div>

        <div className="flex w-[250px] justify-between ">
          <button
            type="button"
            onClick={() => handlePrevPage()}
            disabled={page === 1}
            className={`${styles.arrowButtonPaginationActive} ${
              !(page === 1) ? "hover:bg-green-400" : " text-gray-500"
            } ${text.md}`}
          >
            <Image
              src={`/assets/svg/prev.svg`}
              alt="prev"
              width="18"
              height="18"
            />
            Prev
          </button>

          <button
            type="button"
            onClick={() => handleNextPage()}
            disabled={rowsPerPage == 0 ? true : disabledNextPageButton}
            className={`${styles.arrowButtonPaginationActive} ${
              (rowsPerPage == 0 ? true : disabledNextPageButton)
                ? " text-gray-500"
                : "hover:bg-green-400"
            } ${text.md}`}
          >
            Next
            <Image
              src={`/assets/svg/next.svg`}
              alt="next"
              width="18"
              height="18"
            />
          </button>
        </div>
      </div>
    </>
  );
}
