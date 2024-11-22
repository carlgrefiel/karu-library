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

exports.convertToText = convertToText;
exports.currentDateComponent = currentDateComponent;
exports.currentDateComponentStr = currentDateComponentStr;
exports.currentTimestamp = currentTimestamp;
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=index.js.map
