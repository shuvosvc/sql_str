const Validator = require("validator");
const isEmpty = require("../is-empty");

const roleCharecters = require("../../util/roleChecker");

module.exports = function validateRegisterInput(data) {
  const errors = {};

  if (data.password && typeof data.password !== "string") {
    errors.err = "Password must be string!";
  }
  if (data.name && typeof data.name !== "string") {
    errors.err = "Name must be string!";
  }
  data.password = !isEmpty(data.password) ? data.password.toString() : "";
  data.email = !isEmpty(data.email) ? data.email.toString() : "";
  data.name = !isEmpty(data.name) ? data.name.toString() : "";

  if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
    errors.err = "Invalid email!";
  }

  if (
    !Validator.isEmpty(data.password) &&
    !Validator.isLength(data.password, { min: 8 })
  ) {
    errors.err = "Password must be greater than 8 charecter!";
  }
  if (
    !Validator.isEmpty(data.password) &&
    !Validator.isLength(data.password, { max: 20 })
  ) {
    errors.err = "Password must be less than 20 charecter!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
