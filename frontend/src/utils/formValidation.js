export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value && value.toString().length >= min;
};

export const validateMaxLength = (value, max) => {
  return value && value.toString().length <= max;
};

export const validateMatch = (value1, value2) => {
  return value1 === value2;
};

export const validateDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSizeMB) => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateNumberRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

export const validatePhoneNumber = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone);
};