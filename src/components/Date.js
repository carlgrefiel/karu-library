export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateToMMDDYYYY(dateString) {
  if (!dateString) {
    return "N/A";
  }
  // Split the input date string into parts
  const parts = dateString.split("-");

  // Extract the year, month, and day from the parts array
  const year = parts[0];
  let month = parts[1];
  let day = parts[2];

  // Remove any leading zeros from month and day
  month = month.length === 1 ? "0" + month : month;
  day = day.length === 1 ? "0" + day : day;

  // Return the formatted date string
  return `${month}/${day}/${year}`;
}

export function formatDateV3(inputDate) {
  // Check if inputDate is null
  if (inputDate === null) {
    return "";
  }

  // Parse the input date string
  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  let day = parseInt(parts[2]);

  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  const date = new Date(year, monthIndex, day);

  // Format the date
  const month = months[date.getMonth()];

  const formattedDate = month + " " + day + ", " + date.getFullYear();

  return formattedDate;
}

export function formatDateV2(inputDate) {
  // Check if inputDate is null
  if (!inputDate) {
    return "N/A";
  }

  // Parse the input date string
  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  let day = parseInt(parts[2]);

  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  const date = new Date(year, monthIndex, day);

  // Format the date
  const month = months[date.getMonth()];

  const formattedDate = month + " " + day + ", " + date.getFullYear();

  return formattedDate;
}

export function formatDate(inputDate) {
  // Check if inputDate is null
  if (inputDate === null) {
    return "N/A";
  }

  // Parse the input date string
  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  let day = parseInt(parts[2]);

  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  const date = new Date(year, monthIndex, day);

  // Format the date
  const month = months[date.getMonth()];

  const formattedDate = month + " " + day + ", " + date.getFullYear();

  return formattedDate;
}

export function formatMonthYear(inputDate) {
  if (inputDate === null || inputDate === "N/A") {
    if (inputDate === "N/A") {
      return inputDate;
    } else {
      return null;
    }
  }

  // Parse the input date string
  const parts = inputDate.split("-");
  const year = parseInt(parts[0]);
  const monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  const day = parseInt(parts[2]);

  // Create a Date object
  const date = new Date(year, monthIndex, day);

  // Format the date
  const month = months[date.getMonth()];

  const formattedDate = month + " " + date.getFullYear();

  return formattedDate;
}

export function formatSuffixes(inputDate) {
  if (inputDate === null) {
    return null;
  }
  // Parse the input date string
  const parts = inputDate.split("-");
  const day = parseInt(parts[2]);

  if (day === 1 || day === 21 || day === 31) {
    return "st";
  } else if (day === 2 || day === 22) {
    return "nd";
  } else if (day === 3 || day === 23) {
    return "rd";
  } else {
    return "th";
  }
}

export function formatDay(inputDate) {
  if (inputDate === null) {
    return null;
  }
  // Parse the input date string
  const parts = inputDate.split("-");
  const day = parseInt(parts[2]);

  return day;
}

export function formatTimeAgo(data) {
  const currentTime = new Date();
  const timestampDate = new Date(data);

  // Adjust timestampDate to current time zone
  const timestampDateLocal = new Date(
    timestampDate.getTime() + timestampDate.getTimezoneOffset() * 60000
  );

  const timeDifference = currentTime - timestampDateLocal;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
