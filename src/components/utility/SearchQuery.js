"use client";

import Image from "next/image";
import React from "react";
import { styles } from "./style";

export default function SearchQuery({ query, setQuery }) {
  const handleOnChange = (e) => {
    const username = e.target.value;
    setQuery(username);
  };

  return (
    <div
      className={`${styles.searchInput}
bg-white  w-full `}
    >
      <input
        className={styles.inputPds}
        placeholder="Please Search"
        value={query}
        onChange={handleOnChange}
        autoFocus
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
          }}
        >
          <Image
            src={`/assets/svg/closeBlack.svg`}
            alt="close"
            width="25"
            height="25"
            className="mx-2"
          />
        </button>
      )}
    </div>
  );
}
