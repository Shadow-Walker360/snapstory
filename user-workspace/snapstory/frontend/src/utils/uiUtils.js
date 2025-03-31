/**
 * UI component utilities
 */

/**
 * Generate avatar placeholder from name
 * @param {string} name - User name
 * @returns {string} Initials
 */
export const generateAvatar = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  let initials = parts[0].charAt(0).toUpperCase();
  if (parts.length > 1) {
    initials += parts[parts.length - 1].charAt(0).toUpperCase();
  }
  return initials;
};

/**
 * Get contrast color for background
 * @param {string} bgColor - Background color (hex/rgb)
 * @returns {string} 'dark' or 'light'
 */
export const getContrastColor = (bgColor) => {
  // Convert to RGB if hex
  let r, g, b;
  if (bgColor.startsWith('#')) {
    r = parseInt(bgColor.slice(1, 3), 16);
    g = parseInt(bgColor.slice(3, 5), 16);
    b = parseInt(bgColor.slice(5, 7), 16);
  } else if (bgColor.startsWith('rgb')) {
    [r, g, b] = bgColor.match(/\d+/g).map(Number);
  } else {
    return 'dark'; // Default to dark text
  }

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'dark' : 'light';
};

/**
 * Generate random hex color
 * @returns {string} Hex color code
 */
export const getRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
};

/**
 * Format text with line breaks
 * @param {string} text - Input text
 * @returns {Array} Array of paragraphs
 */
export const formatTextWithLineBreaks = (text) => {
  return text.split('\n').filter(paragraph => paragraph.trim());
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generate CSS class string from object
 * @param {Object} classes - Class map
 * @returns {string} Class string
 */
export const classNames = (classes) => {
  return Object.entries(classes)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ');
};

/**
 * Scroll to element smoothly
 * @param {string} selector - CSS selector
 * @param {Object} options - Scroll options
 */
export const scrollTo = (selector, options = {}) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    });
  }
};