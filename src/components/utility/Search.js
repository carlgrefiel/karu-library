"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { styles } from "./style";
import { encryptText } from "./utilsV2";

export default function Search({
  setPage,
  view,
  search,
  width,
  encrypt = true,
  clearSearch = () => {},
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(search ? search : "");
  const [deferredValue] = useDebounce(query, 1000);
  const handleOnChange = (e) => {
    let username = e.target.value;
    // Remove special characters using regex
    username = username.replace(/[^\w\s]/gi, "");
    if (!username) {
      !view
        ? router.push(pathname)
        : router.push(`?view=${encrypt ? encryptText(view) : view}`);
    }
    setQuery(username);
    if (username === "") {
      clearSearch();
    }
  };

  const handleClearSearch = () => {
    if (view) {
      router.push(`?view=${encrypt ? encryptText(view) : view}`);
    } else {
      router.push(pathname);
    }
    setQuery(""); // Clear the search query
    clearSearch();
  };

  useEffect(() => {
    if (deferredValue) {
      setPage && setPage(0);
      if (view) {
        router.push(
          `?search=${deferredValue}${
            view && "&view=" + `${encrypt ? encryptText(view) : view}`
          }`
        );
      } else {
        router.push(`?search=${deferredValue}`);
      }
    }
  }, [deferredValue]);

  return (
    <div className={`${styles.searchInput} ${width} `}>
      {(!query || !(width === "w-1/3")) && (
        <Image
          src={`/assets/svg/search.svg`}
          alt="search"
          width="28"
          height="28"
          className="mx-2"
        />
      )}
      <input
        className={styles.inputPds}
        placeholder="Search"
        value={query}
        onChange={handleOnChange}
      />
      {query && (
        <button type="button" onClick={() => handleClearSearch()}>
          <Image
            src={`/assets/svg/closeBlack.svg`}
            alt="close"
            width="28"
            height="28"
            className="mx-2"
          />
        </button>
      )}
    </div>
  );
}
