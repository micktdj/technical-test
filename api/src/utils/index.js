const passwordValidator = require("password-validator");

function validatePassword(password) {
  if (typeof password !== "string") {
    return false;
  }

  const schema = new passwordValidator();
  schema
    .is()
    .min(6) // Minimum length 6
    .is()
    .max(100); // Maximum length 100

  return schema.validate(password);
}

module.exports = {
  validatePassword,
};
