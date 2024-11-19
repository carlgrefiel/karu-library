"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = (data, fileName = "data") => {
  // Create a new workbook and a worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Generate a buffer
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the buffer
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  // Save the Blob to a file
  saveAs(blob, `${fileName}.xlsx`);
};
