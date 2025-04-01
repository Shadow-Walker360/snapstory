/**
 * Security utilities
 */

/**
 * Sanitize HTML input
 * @param {string} str - Input string
 * @returns {string} Sanitized string
 */
export const sanitizeHTML = (str) => {
  if (!str) return '';
  return str.replace(/</g, '<').replace(/>/g, '>');
};

/**
 * Escape regex special characters
 * @param {string} str - Input string
 * @returns {string} Escaped string
 */
export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= minLength;

  return {
    valid: isLongEnough && hasUpper && hasLower && hasNumber && hasSpecial,
    isLongEnough,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial
  };
};

/**
 * Generate CSRF token
 * @returns {string} CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint32Array(8);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + dec.toString(16)).slice(-2)).join('');
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate secure random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, x => chars[x % chars.length]).join('');
};

/**
 * Check for XSS vulnerabilities in string
 * @param {string} str - String to check
 * @returns {boolean} True if potentially unsafe
 */
export const detectXSS = (str) => {
  if (!str) return false;
  const xssPatterns = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    /javascript:[^"']*/i,
    /on\w+="[^"]*"/i,
    /on\w+='[^']*'/i,
    /on\w+=[^"'>\s]*/i
  ];
  return xssPatterns.some(pattern => pattern.test(str));
};