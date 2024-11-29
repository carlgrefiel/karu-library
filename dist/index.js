'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var today = new Date();
var currentDateComponent = today.toISOString().split("T")[0];
var dateSpit = currentDateComponent.split("-");
var currentDateComponentStr = "".concat(dateSpit[1]).concat(dateSpit[2]).concat(dateSpit[0]);
var currentTimestamp = function currentTimestamp() {
  var currentDateTime = new Date(); // Get current date and time
  var localDateTime = new Date(currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000); // Adjust for local timezone
  var timestamp = localDateTime.toISOString().slice(0, 19).replace("T", " ");
  return timestamp;
};
var convertToText = function convertToText(str) {
  return str.split("_") // Split the string by underscores
  .join(" "); // Join the words with spaces
};
var verifyPassword = function verifyPassword(password) {
  // verify password and return true if all validation is meant
  var validationsPassword = {
    hasUpperCase: function hasUpperCase(value) {
      return /[A-Z]/.test(value);
    },
    hasLowerCase: function hasLowerCase(value) {
      return /[a-z]/.test(value);
    },
    hasNumber: function hasNumber(value) {
      return /\d/.test(value);
    },
    hasSpecialChar: function hasSpecialChar(value) {
      return /[@$!%*?&]/.test(value);
    },
    minLength: function minLength(value) {
      return value.length >= 8;
    }
  };
  return validationsPassword.hasUpperCase(password) && validationsPassword.hasLowerCase(password) && validationsPassword.hasNumber(password) && validationsPassword.hasSpecialChar(password) && validationsPassword.minLength(password);
};

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatDateToMMDDYYYY(dateString) {
  if (!dateString) {
    return "N/A";
  }
  // Split the input date string into parts
  var parts = dateString.split("-");

  // Extract the year, month, and day from the parts array
  var year = parts[0];
  var month = parts[1];
  var day = parts[2];

  // Remove any leading zeros from month and day
  month = month.length === 1 ? "0" + month : month;
  day = day.length === 1 ? "0" + day : day;

  // Return the formatted date string
  return "".concat(month, "/").concat(day, "/").concat(year);
}
function formatDateV3(inputDate) {
  // Check if inputDate is null
  if (inputDate === null) {
    return "";
  }

  // Parse the input date string
  var parts = inputDate.split("-");
  var year = parseInt(parts[0]);
  var monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  var day = parseInt(parts[2]);
  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  var date = new Date(year, monthIndex, day);

  // Format the date
  var month = months[date.getMonth()];
  var formattedDate = month + " " + day + ", " + date.getFullYear();
  return formattedDate;
}
function formatDateV2(inputDate) {
  // Check if inputDate is null
  if (!inputDate) {
    return "N/A";
  }

  // Parse the input date string
  var parts = inputDate.split("-");
  var year = parseInt(parts[0]);
  var monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  var day = parseInt(parts[2]);
  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  var date = new Date(year, monthIndex, day);

  // Format the date
  var month = months[date.getMonth()];
  var formattedDate = month + " " + day + ", " + date.getFullYear();
  return formattedDate;
}
function formatDate(inputDate) {
  // Check if inputDate is null
  if (inputDate === null) {
    return "N/A";
  }

  // Parse the input date string
  var parts = inputDate.split("-");
  var year = parseInt(parts[0]);
  var monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  var day = parseInt(parts[2]);
  if (day < 10) {
    day = "0" + day;
  }

  // Create a Date object
  var date = new Date(year, monthIndex, day);

  // Format the date
  var month = months[date.getMonth()];
  var formattedDate = month + " " + day + ", " + date.getFullYear();
  return formattedDate;
}
function formatMonthYear(inputDate) {
  if (inputDate === null || inputDate === "N/A") {
    if (inputDate === "N/A") {
      return inputDate;
    } else {
      return null;
    }
  }

  // Parse the input date string
  var parts = inputDate.split("-");
  var year = parseInt(parts[0]);
  var monthIndex = parseInt(parts[1]) - 1; // Month indexes are zero-based
  var day = parseInt(parts[2]);

  // Create a Date object
  var date = new Date(year, monthIndex, day);

  // Format the date
  var month = months[date.getMonth()];
  var formattedDate = month + " " + date.getFullYear();
  return formattedDate;
}
function formatSuffixes(inputDate) {
  if (inputDate === null) {
    return null;
  }
  // Parse the input date string
  var parts = inputDate.split("-");
  var day = parseInt(parts[2]);
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
function formatDay(inputDate) {
  if (inputDate === null) {
    return null;
  }
  // Parse the input date string
  var parts = inputDate.split("-");
  var day = parseInt(parts[2]);
  return day;
}
function formatTimeAgo(data) {
  var currentTime = new Date();
  var timestampDate = new Date(data);

  // Adjust timestampDate to current time zone
  var timestampDateLocal = new Date(timestampDate.getTime() + timestampDate.getTimezoneOffset() * 60000);
  var timeDifference = currentTime - timestampDateLocal;
  var seconds = Math.floor(timeDifference / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var weeks = Math.floor(days / 7);
  var months = Math.floor(days / 30);
  if (months > 0) {
    return "".concat(months, " month").concat(months !== 1 ? "s" : "", " ago");
  } else if (weeks > 0) {
    return "".concat(weeks, " week").concat(weeks !== 1 ? "s" : "", " ago");
  } else if (days > 0) {
    return "".concat(days, " day").concat(days !== 1 ? "s" : "", " ago");
  } else if (hours > 0) {
    return "".concat(hours, " hour").concat(hours !== 1 ? "s" : "", " ago");
  } else if (minutes > 0) {
    return "".concat(minutes, " minute").concat(minutes !== 1 ? "s" : "", " ago");
  } else {
    return "Just now";
  }
}

exports.convertToText = convertToText;
exports.currentDateComponent = currentDateComponent;
exports.currentDateComponentStr = currentDateComponentStr;
exports.currentTimestamp = currentTimestamp;
exports.formatDate = formatDate;
exports.formatDateToMMDDYYYY = formatDateToMMDDYYYY;
exports.formatDateV2 = formatDateV2;
exports.formatDateV3 = formatDateV3;
exports.formatDay = formatDay;
exports.formatMonthYear = formatMonthYear;
exports.formatSuffixes = formatSuffixes;
exports.formatTimeAgo = formatTimeAgo;
exports.months = months;
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=index.js.map
