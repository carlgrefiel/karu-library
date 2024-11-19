"use client";

import React from "react";
import { styles, text } from "./style";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        target="_blank"
        href="https://phrmdo.bohol.gov.ph/"
        rel="noopener noreferrer"
      >
        <span className={`${text.md}`}>PHRMDO © 2024</span>
      </a>
      <span className={`${text.sm}`}>BD: 01112024-1</span>
    </div>
  );
}
