const today = new Date();
export const currentDateComponent = today.toISOString().split("T")[0];
const dateSpit = currentDateComponent.split("-");
export const currentDateComponentStr = `${dateSpit[1]}${dateSpit[2]}${dateSpit[0]}`;

export const currentTimestamp = () => {
  const currentDateTime = new Date(); // Get current date and time
  const localDateTime = new Date(
    currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000
  ); // Adjust for local timezone
  const timestamp = localDateTime.toISOString().slice(0, 19).replace("T", " ");

  return timestamp;
};

export const convertToText = (str) => {
  return str
    .split("_") // Split the string by underscores
    .join(" "); // Join the words with spaces
};

export const verifyPassword = (password) => {
  // verify password and return true if all validation is meant
  const validationsPassword = {
    hasUpperCase: (value) => /[A-Z]/.test(value),
    hasLowerCase: (value) => /[a-z]/.test(value),
    hasNumber: (value) => /\d/.test(value),
    hasSpecialChar: (value) => /[@$!%*?&]/.test(value),
    minLength: (value) => value.length >= 8,
  };
  return (
    validationsPassword.hasUpperCase(password) &&
    validationsPassword.hasLowerCase(password) &&
    validationsPassword.hasNumber(password) &&
    validationsPassword.hasSpecialChar(password) &&
    validationsPassword.minLength(password)
  );
};
