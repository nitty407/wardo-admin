export const exp_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const indian_mobile_number = /^([0]|\+91)?[6-9]\d{9}$/;

export const digitsOnly = /^[0-9\b]+$/;

export function isRequired(value) {
  return value === null ||
    value === undefined ||
    ("" + value).trim().length <= 0
    ? "This field is required"
    : undefined;
}

function isMinLength(value, min) {
  return value.length >= min;
}

function isMaxLength(value, max) {
  return value.length <= max;
}

function isLengthWithinRange(value, min, max) {
  return isMinLength(value, min) && isMaxLength(value, max);
}

function validateMinLength(value, min) {
  return isMinLength(value, min)
    ? undefined
    : `Field must be at least ${min} characters long`;
}

function validateMaxLength(value, max) {
  return isMaxLength(value, max)
    ? undefined
    : `Field must be at Max ${max} characters long`;
}

export function isPasswordAndRequired(value, min) {
  return (
    isRequired(value) ||
    (isMinLength(value, min)
      ? undefined
      : `Password must be ${min} characters long`)
  );
}

export function validateLengthRange(value, min, max) {
  return (
    isRequired(value) ||
    (isLengthWithinRange(value, min, max)
      ? undefined
      : `Field must be within ${min} to ${max} range`)
  );
}

export function passwordMatchValidation(value, values) {
  return (
    isRequired(value) ||
    (values.password !== values.confirmPassword
      ? "Password must match"
      : undefined)
  );
}

export function validateLoginFields(values) {
  return {
    email: isEmail(values.email),
    password: isPasswordAndRequired(values.password)
  };
}

export function isEmail(value) {
  return (
    isRequired(value) || isValid(exp_email, value, "Please enter valid email")
  );
}

export function isValid(pattern, value = "", message) {
  return pattern.test(value) ? undefined : message;
}

export function isRequiredAndPattern(pattern, value = "", message) {
  return isRequired(value) || isValid(pattern, value, message);
}
