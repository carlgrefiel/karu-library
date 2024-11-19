import React, { useEffect, useState } from "react";
import { styles, text } from "./style";
import { Eye, EyeOff, LockClosed } from "heroicons-react";
import { ButtonClose } from "./Button";
import Image from "next/image";
import Link from "next/link";
import { alertError } from "./Alerts";
import { useBlurrStyle } from "@/hooks/useBlurrStyle";

export default function Input({
  label = "",
  placeholder,
  isEdit = true,
  textCenter = false,
  type = "text",
  name,
  required = false,
  errors,
  register,
  defaultValue = "",
  width = "",
  pattern,
  loadingSkeleton = false,
  showAlert = false,
  autoFocus = false,
}) {
  const { blurr } = useBlurrStyle();
  return (
    <div
      className={`${styles.containerPds} ${width} `}
      onClick={() => {
        if (!isEdit && showAlert) {
          alertError("Editing is not allowed for this field.");
        }
      }}
    >
      {!(label === "") && (
        <label htmlFor={name} className={`${styles.labelPds}`}>
          {label}
          <span className={`${text.lg} text-red-600  px-1`}>
            {isEdit ? required && "*" : ""}
          </span>
        </label>
      )}
      <div
        className={`${
          required
            ? isEdit
              ? `${styles.inputContainerPds} bg-gray-200 `
              : styles.inputContainerPds
            : "flex border rounded w-full "
        } ${
          errors ? (isEdit ? styles.borderError : styles.border) : styles.border
        } ${loadingSkeleton ? ` bg-neutral-300 animate-pulse ` : ""}`}
      >
        {!isEdit ? (
          <div
            className={`${styles.inputDefaultValue} ${
              defaultValue ? "" : "h-[40px]"
            } ${blurr}`}
          >
            {!loadingSkeleton && toUpper(defaultValue)}
          </div>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            readOnly={!isEdit}
            placeholder={placeholder ? placeholder : label}
            defaultValue={
              type === "email" ? defaultValue : toUpper(defaultValue)
            }
            {...register(name, { required: required, pattern: pattern })}
            className={`${styles.inputPds} ${textCenter && "text-center"} ${
              blurr ? "blur-sm" : ""
            }`}
            autoFocus={autoFocus}
          />
        )}
      </div>
      {isEdit && errors?.message && (
        <span className={styles.inputError}>{errors?.message}</span>
      )}
    </div>
  );
}

export function InputPassword({
  noLabel = false,
  label,
  name,
  required = true,
  errors,
  register,
  width = "",
  login = false,
  invalidCredentials = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validations = {
    hasUpperCase: (value) => /[A-Z]/.test(value),
    hasLowerCase: (value) => /[a-z]/.test(value),
    hasNumber: (value) => /\d/.test(value),
    hasSpecialChar: (value) => /[@$!%*?&]/.test(value),
    minLength: (value) => value.length >= 8,
  };

  return (
    <div className={`${styles.containerPds} ${width}`}>
      {!noLabel && (
        <label htmlFor={name} className={`${text.md} font-medium`}>
          {label}
          {!login && (
            <span className="text-red-600 text-lg px-1">{required && "*"}</span>
          )}
        </label>
      )}
      <div
        className={`${
          required ? styles.inputContainerPds : "flex border rounded w-full"
        } ${
          errors
            ? password &&
              (login
                ? true
                : validations.hasUpperCase(password) &&
                  validations.hasLowerCase(password) &&
                  validations.hasNumber(password) &&
                  validations.hasSpecialChar(password) &&
                  validations.minLength(password))
              ? styles.border
              : styles.borderError
            : invalidCredentials
            ? styles.borderError
            : styles.border
        }`}
      >
        <LockClosed className="w-6 h-6 text-green-500 mx-2" />
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          {...register(
            name,
            login
              ? { required: true }
              : {
                  required: true,
                  validate: {
                    hasUpperCase: (value) => validations.hasUpperCase(value),
                    hasLowerCase: (value) => validations.hasLowerCase(value),
                    hasNumber: (value) => validations.hasNumber(value),
                    hasSpecialChar: (value) =>
                      validations.hasSpecialChar(value),
                    minLength: (value) => validations.minLength(value),
                  },
                }
          )}
          className="w-full p-2 bg-transparent outline-none"
          onChange={handlePasswordChange}
        />
        <button type="button" onClick={handleTogglePasswordVisibility}>
          {showPassword ? (
            <Eye className="w-6 h-6 text-green-500 mx-2" />
          ) : (
            <EyeOff className="w-6 h-6 text-green-500 mx-2" />
          )}
        </button>
      </div>
      {!login && (
        <div className="flex flex-col gap-1 mt-1">
          <span
            className={`${
              validations.hasUpperCase(password)
                ? "text-green-600 font-semibold"
                : "text-gray-600"
            } ${text.sm}`}
          >
            * Password must include at least one Uppercase letter
          </span>
          <span
            className={`${
              validations.hasLowerCase(password)
                ? "text-green-600 font-semibold"
                : "text-gray-600"
            } ${text.sm}`}
          >
            * Password must include at least one Lowercase letter
          </span>
          <span
            className={`${
              validations.hasNumber(password)
                ? "text-green-600 font-semibold"
                : "text-gray-600"
            } ${text.sm}`}
          >
            * Password must include at least one number
          </span>
          <span
            className={`${
              validations.hasSpecialChar(password)
                ? "text-green-600 font-semibold"
                : "text-gray-600"
            } ${text.sm}`}
          >
            * Password must include at least one special character
          </span>
          <span
            className={`${
              validations.minLength(password)
                ? "text-green-600 font-semibold"
                : "text-gray-600"
            } ${text.sm}`}
          >
            * Password must be at least 8 characters long
          </span>
        </div>
      )}
    </div>
  );
}

export function Radio({ register, name, defaultChecked, label }) {
  return (
    <label className={`flex gap-2 ${text.md}`}>
      <input
        className="w-6 h-6"
        type="radio"
        name={name}
        value={label}
        {...register(name)}
        defaultChecked={defaultChecked}
      />
      {label}
    </label>
  );
}

export function TextArea({
  label,
  placeholder,
  isEdit = true,
  name,
  required = false,
  errors,
  register,
  defaultValue = "",
  width = "",
  rows = 3, // Default rows for textarea
  loadingSkeleton = false,
}) {
  const { blurr } = useBlurrStyle();
  return (
    <div className={`${styles.containerPds} ${width}`}>
      <label htmlFor={name} className={`${styles.labelPds}`}>
        {label}
        <span className="text-red-600 text-lg px-1">
          {isEdit ? required && "*" : ""}
        </span>
      </label>
      <div
        className={`${styles.inputContainerPds} ${
          required && isEdit ? "bg-gray-200" : ""
        } ${
          errors ? (isEdit ? styles.borderError : styles.border) : styles.border
        } ${loadingSkeleton ? ` bg-neutral-300 animate-pulse ` : ""}`}
      >
        {!isEdit ? (
          <div
            className={`
             ${
               defaultValue
                 ? styles.inputDefaultValue
                 : `${styles.inputDefaultValue} `
             }
                h-[250px] ${blurr}`}
          >
            {!loadingSkeleton && toUpper(defaultValue)}
          </div>
        ) : (
          <textarea
            name={name}
            id={name}
            readOnly={!isEdit}
            placeholder={placeholder ? placeholder : label}
            defaultValue={defaultValue}
            {...register(name, { required: required })}
            className={`${styles.inputPds} h-${rows * 10} ${
              blurr ? "blur-sm" : ""
            }`} // Adjust height based on number of rows
            rows={rows}
          />
        )}
      </div>
      {isEdit && errors?.message && (
        <span className={`${styles.inputError}`}>{errors?.message}</span>
      )}
    </div>
  );
}

export function Select({
  children,
  label,
  isEdit = true,
  name,
  required = false,
  errors,
  register,
  defaultValue = "",
  loadingSkeleton = false,
  onChange,
}) {
  const { blurr } = useBlurrStyle();
  return (
    <div className={styles.containerPds}>
      <label htmlFor={name} className={`${styles.labelPds}`}>
        {label}
        <span className="text-red-600 text-lg px-1">
          {isEdit ? required && "*" : ""}
        </span>
      </label>
      <div
        className={`${
          required
            ? isEdit
              ? `${styles.inputContainerPds} bg-gray-200`
              : styles.inputContainerPds
            : "flex border rounded w-full text-lg"
        } ${
          errors ? (isEdit ? styles.borderError : styles.border) : styles.border
        } ${loadingSkeleton ? ` bg-neutral-300 animate-pulse ` : ""}`}
      >
        {!isEdit ? (
          <div
            className={`${
              defaultValue
                ? styles.inputDefaultValue
                : `${styles.inputDefaultValue} h-[40px] `
            } ${blurr}`}
          >
            {!loadingSkeleton && toUpper(defaultValue)}
          </div>
        ) : (
          <>
            {onChange ? (
              <select
                name={name}
                id={name}
                disabled={!isEdit}
                placeholder={label}
                className={`${styles.inputPds} ${blurr}`}
                defaultValue={toUpper(defaultValue)}
                {...register(name, { required: required })}
                onChange={onChange}
              >
                {children}
              </select>
            ) : (
              <select
                name={name}
                id={name}
                disabled={!isEdit}
                placeholder={label}
                className={`${styles.inputPds} ${blurr}`}
                defaultValue={toUpper(defaultValue)}
                {...register(name, { required: required })}
              >
                {children}
              </select>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function SelectOthers({
  children,
  label,
  name,
  required = false,
  errors,
  register,
  defaultValue = "",
  others,
  setIsDirtyOthers,
  pattern,
}) {
  const [isOtherSelected, setIsOtherSelected] = useState(true);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "others") {
      setIsOtherSelected(false);
    } else {
      setIsOtherSelected(true);
    }
    setIsDirtyOthers(selectedValue == defaultValue);
  };

  useEffect(() => {
    setIsOtherSelected(true);
  }, [defaultValue]);

  return (
    <>
      {isOtherSelected ? (
        <Select
          label={label}
          errors={errors}
          register={register}
          name={name}
          required={required}
          defaultValue={defaultValue}
          onChange={handleChange} // Handle change to check if "Others" is selected
        >
          {children}
          <option className="text-black font-medium " value="others">
            {others + "_______________________"}
          </option>
          {/* Add "Others" option */}
        </Select>
      ) : (
        <div className="flex gap-2">
          <Input
            label={label}
            placeholder={others}
            errors={errors}
            register={register}
            name={name}
            required={required}
            pattern={pattern}
          />
          <div className="flex mt-9">
            <ButtonClose
              onClick={() => {
                setIsOtherSelected(true);
                setIsDirtyOthers(true);
              }}
              icon="closeBlack"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function SelectNoBorder({ children, onChange, value, icon }) {
  return (
    <div className={styles.employeesSelectionContainer}>
      <Image
        src={`/assets/svg/${icon}.svg`}
        alt="office"
        width="25"
        height="25"
      />
      <select
        className={`${styles.employeesSelectionItem} `}
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
    </div>
  );
}

export function CheckBox({ name, label, register, defaultChecked }) {
  return (
    <div className="flex gap-2 items-center pl-5">
      <input
        type="checkbox"
        className={"flex w-5 h-5"}
        id={name}
        defaultChecked={defaultChecked}
        {...register(name)}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export function CheckBoxV2({ name, checked, label, onChange }) {
  return (
    <label className={styles.labelCheckBox}>
      <input
        type="checkbox"
        className="scale-150"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      {label}
    </label>
  );
}

export function CheckBoxQuestion({
  handleOnChange,
  variableName,
  name,
  question,
  children,
  isEdit = true,
  defaultValue,
}) {
  return (
    <div className="flex">
      <div className={` ${text.md} bg-gray-200 p-3 w-2/3 sm:w-3/4`}>
        {question}
      </div>
      <div className="w-1/4 flex flex-col justify-center py-3">
        <div className="flex items-center justify-evenly">
          {isEdit ? (
            <>
              <label className={styles.labelCheckBox}>
                <input
                  type="checkbox"
                  disabled={!isEdit}
                  className="scale-150"
                  checked={variableName === "Yes"}
                  onChange={() => handleOnChange("Yes", name)}
                />
                YES
              </label>
              <label className={styles.labelCheckBox}>
                <input
                  type="checkbox"
                  disabled={!isEdit}
                  className="scale-150"
                  checked={variableName === "No"}
                  onChange={() => handleOnChange("No", name)}
                />
                NO
              </label>
            </>
          ) : (
            <>
              {defaultValue ? (
                <>
                  <label className={styles.labelCheckBox}>
                    <input
                      type="checkbox"
                      className="scale-150"
                      checked={defaultValue === "Yes"}
                      readOnly={true}
                    />
                    YES
                  </label>
                  <label className={styles.labelCheckBox}>
                    <input
                      type="checkbox"
                      className="scale-150"
                      checked={defaultValue === "No"}
                      readOnly={true}
                    />
                    NO
                  </label>
                </>
              ) : (
                <>
                  <label className={styles.labelCheckBox}>
                    <input
                      type="checkbox"
                      checked={false}
                      className="scale-150"
                      readOnly={true}
                    />
                    YES
                  </label>
                  <label className={styles.labelCheckBox}>
                    <input
                      type="checkbox"
                      checked={false}
                      className="scale-150"
                      readOnly={true}
                    />
                    NO
                  </label>
                </>
              )}
            </>
          )}
        </div>
        {isEdit ? (
          <>{variableName === "Yes" && <div>{children}</div>}</>
        ) : (
          <>{defaultValue === "Yes" && <div>{children}</div>}</>
        )}
      </div>
    </div>
  );
}

export const toUpper = (item) => {
  if (typeof item === "string") {
    const upperCase = item.charAt(0).toUpperCase() + item.slice(1);
    return upperCase;
  }

  return item;
};

export const toUpperV2 = (item) => {
  if (typeof item === "string") {
    const words = item.split(" "); // Split the string into words
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of each word
    });
    const upperCase = capitalizedWords.join(" "); // Join the words back together
    return upperCase;
  }
  return item;
};

export const toUpperV3 = (item) => {
  if (typeof item === "string") {
    const lowercaseWords = ["of", "the", "and", "for"]; // Words to keep lowercase
    const words = item.toLowerCase().split(" "); // Split the string into words

    const capitalizedWords = words.map((word, index) => {
      // Capitalize the first word always, or if the word is not in the lowercaseWords array
      if (index === 0 || !lowercaseWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word; // Return the word unchanged if it's "of" or "the"
    });

    const upperCase = capitalizedWords.join(" "); // Join the words back together
    return upperCase;
  }
  return item;
};

export function InputUnderline({
  label,
  isEdit = true,
  type = "text",
  name,
  required = false,
  errors,
  register,
  defaultValue = "",
  width = "",
}) {
  return (
    <div className={`flex flex-col p-3 ${width}`}>
      <label htmlFor={name} className={`${styles.labelPds}`}>
        {label}
      </label>
      <div
        className={`flex ${
          errors ? "border-2 rounded-lg bg-red-100" : "border-b-2"
        } border-gray-500  w-full
         ${
           errors
             ? isEdit
               ? styles.borderError
               : styles.border
             : styles.border
         }`}
      >
        {!isEdit ? (
          <div className="w-full p-2 h-[40px] font-semibold text-gray-700">
            {toUpper(defaultValue)}
          </div>
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            readOnly={!isEdit}
            defaultValue={toUpper(defaultValue)}
            {...register(name, { required: required })}
            className={styles.inputPds}
          />
        )}
      </div>
    </div>
  );
}

export function InputCRUDSearch({ label, children, onClick, data }) {
  return (
    <>
      <div className={`${styles.containerPds} `}>
        <div className="flex justify-between items-center">
          <label className={styles.labelPds}>{label}</label>
          <button
            type="button"
            onClick={onClick}
            className={`flex p-2 hover:bg-green-300  rounded-md ${text.md}`}
          >
            <Image
              src={`/assets/svg/addBlack.svg`}
              alt="Add"
              width="20"
              height="20"
              className="mx-2"
            />
            Add
          </button>
        </div>
        <span className="flex flex-col  border-2 rounded border-gray-300 divide-y-2">
          {data.length > 0 ? (
            <>{children}</>
          ) : (
            <span className="flex w-full py-[5px] items-center justify-center">
              No Data Found
            </span>
          )}
        </span>
      </div>
    </>
  );
}

export function InputSearch({
  label,
  isEdit = false,
  name,
  required = false,
  errors,
  defaultValue = "",
  width = "",
  onClick,
  loadingSkeleton = false,
}) {
  return (
    <div className={`${styles.containerPds} ${width}`}>
      <label htmlFor={name} className={styles.labelPds}>
        {label}
        <span className="text-red-600 text-lg px-1">
          {isEdit ? required && "*" : ""}
        </span>
      </label>
      <div
        onClick={isEdit ? onClick : () => {}}
        type="button"
        className={`${
          required
            ? isEdit
              ? `${styles.inputContainerPds} bg-gray-200`
              : styles.inputContainerPds
            : "flex border rounded w-full"
        } ${
          errors ? (isEdit ? styles.borderError : styles.border) : styles.border
        } ${loadingSkeleton ? ` bg-neutral-300 animate-pulse ` : ""}`}
      >
        <span
          className={`${styles.inputPds} cursor-pointer ${
            loadingSkeleton && "h-[40px]"
          } `}
        >
          {!loadingSkeleton &&
            (defaultValue ? toUpperV2(defaultValue) : "Please Search")}
        </span>
      </div>
    </div>
  );
}

export function DropDownItemCheckBox({ conditions, onClick, label }) {
  return (
    <li>
      <button className={styles.buttonDropDown} onClick={onClick}>
        <span
          className={`${
            conditions ? "bg-blue-300 border-blue-900" : ""
          } border border-black rounded w-4 h-4 flex justify-center items-center ml-1`}
        >
          {conditions && (
            <Image
              src={`/assets/svg/check.svg`}
              alt="check"
              width="15"
              height="15"
            />
          )}
        </span>
        {label}
      </button>
    </li>
  );
}

export function DropDownItemButton({ onClick, label, icon, error = false }) {
  return (
    <li>
      <button
        onClick={onClick}
        type="button"
        className={`${
          error ? styles.buttonDropDownError : styles.buttonDropDown
        } `}
      >
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={`${icon}`}
          width="20"
          height="20"
        />
        {label}
      </button>
    </li>
  );
}

export function DropDownItemLink({
  onClick,
  label,
  icon,
  href,
  iconSize = "20",
  classStyle,
  prefetch = false,
}) {
  return (
    <li>
      <Link
        prefetch={prefetch}
        href={`${href}`}
        onClick={onClick}
        className={classStyle ? classStyle : styles.buttonDropDown}
      >
        <Image
          src={`/assets/svg/${icon}.svg`}
          alt={`${icon}`}
          width={iconSize}
          height={iconSize}
        />
        {label}
      </Link>
    </li>
  );
}

export function DropDownItemLinkSideBar({
  onClick,
  label,
  href,
  classStyle,
  prefetch = false,
}) {
  return (
    <li>
      <Link
        prefetch={prefetch}
        href={`${href}`}
        onClick={onClick}
        className={`${classStyle} px-6 py-2  text-white hover:bg-gray-200 hover:text-black text-md font-medium flex gap-3 items-center text-start w-full rounded`}
      >
        {label}
      </Link>
    </li>
  );
}

export const validationForLetters = /^[A-Za-zÕÑÃõñã\s-]*$/;
export const validationForLettersAndSpecialCharacters =
  /^[A-Za-zÕÑÃõñã,.()'"\s\-\/&]*$/;
export const validationForLettersAndNumbersAndSpecialCharacters =
  /^[A-Za-z0-9ÕÑÃõñã,.()'"\/&\s\-]*$/;
export const validationForNumbers = /^[0-9]*$/;
export const validationForNumbersAndSpecialChars = /^[0-9'.]*$/;
export const validationForNumbersWithDecimals = /^\d*\.?\d*$/;
export const validationFOrPhoneNumber = /^(09|639)[0-9]{9}$/;
export const yearValidation = /^(19|20)\d{2}$/;

export const valNumV2 = {
  value: validationForNumbers,
  message: "Input contains invalid characters.",
};

export const valPhoNumV2 = {
  value: validationFOrPhoneNumber,
  message: "Please enter valid phone number",
};

export const valLetNumSpeCharV2 = {
  value: validationForLettersAndNumbersAndSpecialCharacters,
  message: "Input contains invalid characters.",
};

export const valLetSpeCharV2 = {
  value: validationForLettersAndSpecialCharacters,
  message: "Input contains invalid characters.",
};

export const valLetV2 = {
  value: validationForLetters,
  message: "Input contains invalid characters.",
};

export const valNumSpeCharV2 = {
  value: validationForNumbersAndSpecialChars,
  message: "Input contains invalid characters.",
};

export const valYear = {
  value: yearValidation,
  message: "Input contains invalid characters.",
};

export const valUsername = {
  noSpaces: (value) => !/\s/.test(value) || "Username cannot contain spaces",
  maxLength: (value) => value.length <= 15 || "Maximum 15 characters",
  noSpecialChars: (value) =>
    /^[^<>;'"`%]*$/.test(value) || "Username contains invalid characters",
};
