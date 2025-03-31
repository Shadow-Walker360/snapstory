/**
 * String manipulation utilities
 */

/**
 * Capitalize first letter of each word in a string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum allowed length
 * @param {boolean} preserveWords - Whether to preserve whole words
 * @returns {string} Truncated text
 */
export const truncate = (text, maxLength = 100, preserveWords = true) => {
  if (!text || text.length <= maxLength) return text;
  
  if (preserveWords) {
    const truncated = text.substr(0, maxLength);
    return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
  }
  return text.substr(0, maxLength) + '...';
};

/**
 * Generate initials from a name
 * @param {string} name - Full name
 * @param {number} maxInitials - Maximum number of initials (default 2)
 * @returns {string} Initials
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name) return '';
  
  const parts = name.split(' ');
  let initials = parts[0].charAt(0).toUpperCase();
  
  if (parts.length > 1 && maxInitials > 1) {
    initials += parts[parts.length - 1].charAt(0).toUpperCase();
  }
  
  return initials;
};

/**
 * Convert camelCase to human readable format
 * @param {string} str - camelCase string
 * @returns {string} Human readable string
 */
export const camelToHuman = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, firstChar => firstChar.toUpperCase())
    .trim();
};

/**
 * Generate a random string ID
 * @param {number} length - Length of ID
 * @returns {string} Random string
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Remove HTML tags from string
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
export const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, '');
};

/**
 * Convert string to URL-friendly slug
 * @param {string} str - Input string
 * @returns {string} URL slug
 */
export const slugify = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
};