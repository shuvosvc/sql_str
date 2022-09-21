const Validator = require("validator");
const isEmpty = require("../is-empty");
const state = require("../../util/errorStatus");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email.toString() : "";

  if (!Validator.isEmail(data.email)) {
    errors.state = state.THIS_EMAIL_IS_INVALID;
  }
  if (Validator.isEmpty(data.email)) {
    errors.state = state.EMAIL_FIELD_IS_REQUIRED;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
