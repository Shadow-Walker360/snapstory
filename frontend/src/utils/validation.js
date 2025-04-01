/**
 * Validation utilities
 */

/**
 * Validate required field
 * @param {*} value - Input value
 * @returns {string|null} Error message
 */
export const validateRequired = (value) => {
  if (!value && value !== 0) return 'This field is required';
  if (typeof value === 'string' && !value.trim()) return 'This field is required';
  return null;
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {string|null} Error message
 */
export const validateEmail = (email) => {
  if (!email) return null;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : 'Invalid email address';
};

/**
 * Validate minimum length
 * @param {string} value - Input value
 * @param {number} min - Minimum length
 * @returns {string|null} Error message
 */
export const validateMinLength = (value, min) => {
  if (!value) return null;
  return value.length >= min ? null : `Must be at least ${min} characters`;
};

/**
 * Validate maximum length
 * @param {string} value - Input value
 * @param {number} max - Maximum length
 * @returns {string|null} Error message
 */
export const validateMaxLength = (value, max) => {
  if (!value) return null;
  return value.length <= max ? null : `Must be ${max} characters or less`;
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {string|null} Error message
 */
export const validatePassword = (password) => {
  if (!password) return null;
  
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  if (password.length < 8) return 'Must be at least 8 characters';
  if (!hasUpper) return 'Must contain an uppercase letter';
  if (!hasLower) return 'Must contain a lowercase letter';
  if (!hasNumber) return 'Must contain a number';
  if (!hasSpecial) return 'Must contain a special character';
  
  return null;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {string|null} Error message
 */
export const validateURL = (url) => {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
};

/**
 * Validate number range
 * @param {number} value - Number value
 * @param {Object} range - Range constraints
 * @param {number} [range.min] - Minimum value
 * @param {number} [range.max] - Maximum value
 * @returns {string|null} Error message
 */
export const validateNumberRange = (value, { min, max }) => {
  if (value === null || value === undefined || value === '') return null;
  if (min !== undefined && value < min) return `Must be at least ${min}`;
  if (max !== undefined && value > max) return `Must be ${max} or less`;
  return null;
};

/**
 * Validate date is in the future
 * @param {Date} date - Date to validate
 * @returns {string|null} Error message
 */
export const validateFutureDate = (date) => {
  if (!date) return null;
  return date > new Date() ? null : 'Date must be in the future';
};

/**
 * Validate against a regex pattern
 * @param {string} value - Input value
 * @param {RegExp} pattern - Regex pattern
 * @param {string} message - Error message
 * @returns {string|null} Error message
 */
export const validatePattern = (value, pattern, message) => {
  if (!value) return null;
  return pattern.test(value) ? null : message;
};

/**
 * Compose multiple validators
 * @param {Array<Function>} validators - Validator functions
 * @returns {Function} Composed validator
 */
export const composeValidators = (...validators) => (value) => {
  return validators.reduce((error, validator) => {
    return error || validator(value);
  }, null);
};