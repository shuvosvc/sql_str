const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateInput(data) {
  const errors = {};
  if (typeof data.password !== "string") {
    errors.err = "Password must be string!";
  }

  if (typeof data.role !== "string") {
    errors.err = "Invalid role!";
  }
  if (typeof data.name !== "string") {
    errors.err = "Name must be string!";
  }
  data.email = !isEmpty(data.email) ? data.email.toString() : "";

  data.password = !isEmpty(data.password) ? data.password.toString() : "";
  data.name = !isEmpty(data.name) ? data.name.toString() : "";

  if (!Validator.isEmail(data.email)) {
    errors.err = "Invalid email!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.err = "Email required!";
  }
  if (Validator.isEmpty(data.role)) {
    errors.err = "Role required!";
  }
  if (data.role !== "coadmin" && data.role !== "user") {
    errors.err = "Invalid role!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.err = "Password required!";
  } else {
    if (!Validator.isLength(data.password, { min: 8 })) {
      errors.err = "Password must be greater than 8 charecter!";
    }
    if (!Validator.isLength(data.password, { max: 20 })) {
      errors.err = "Password must be less than 20 charecter!";
    }
  }
  if (Validator.isEmpty(data.name)) {
    errors.err = "Name required!";
  }
  if (!Validator.isLength(data.name, { max: 20 })) {
    errors.err = "Name must be less than 20 charecter!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
