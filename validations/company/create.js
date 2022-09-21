const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateInput(data) {
  const errors = {};

  if (typeof data.name !== "string") {
    errors.err = "Name must be string!";
  }

  if (typeof data.description !== "string") {
    errors.err = "Description must be string!";
  }
  if (data.image && typeof data.image !== "string") {
    errors.err = "Image must be string!";
  }

  data.description = !isEmpty(data.description)
    ? data.description.toString()
    : "";
  data.name = !isEmpty(data.name) ? data.name.toString() : "";

  if (Validator.isEmpty(data.name)) {
    errors.err = "Name required!";
  }

  if (!Validator.isLength(data.name, { max: 20 })) {
    errors.err = "Name must be less than 20 charecter!";
  }

  if (Validator.isEmpty(data.description)) {
    errors.err = "Description required!";
  }

  if (data.description) {
    if (!Validator.isLength(data.description, { min: 8 })) {
      errors.err = "Description must be greater than 8 charecter!";
    }
    if (!Validator.isLength(data.description, { max: 50 })) {
      errors.err = "Description must be less than 50 charecter!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
