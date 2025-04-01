/**
 * Accessibility utilities
 */

/**
 * Check if element is focusable
 * @param {HTMLElement} element - DOM element
 * @returns {boolean} True if focusable
 */
export const isFocusable = (element) => {
  if (!element) return false;
  
  const focusableTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  if (focusableTags.includes(element.tagName)) {
    return true;
  }

  if (element.hasAttribute('tabindex') && element.getAttribute('tabindex') !== '-1') {
    return true;
  }

  return false;
};

/**
 * Trap focus within a container element
 * @param {HTMLElement} container - Container element
 */
export const trapFocus = (container) => {
  if (!container) return;

  const focusableElements = Array.from(
    container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
  ).filter(el => !el.disabled && el.offsetParent !== null);

  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Add accessible click handler
 * @param {HTMLElement} element - Element to make clickable
 * @param {Function} handler - Click handler
 */
export const makeAccessibleClick = (element, handler) => {
  if (!element) return;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  };

  element.addEventListener('click', handler);
  element.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('click', handler);
    element.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Set ARIA attributes
 * @param {HTMLElement} element - Target element
 * @param {Object} attributes - ARIA attributes
 */
export const setAriaAttributes = (element, attributes) => {
  if (!element) return;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      element.removeAttribute(`aria-${key}`);
    } else {
      element.setAttribute(`aria-${key}`, value);
    }
  });
};

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {'polite'|'assertive'} politeness - Politeness level
 */
export const announce = (message, politeness = 'polite') => {
  const ariaLive = document.getElementById('a11y-announcement') || 
    (() => {
      const el = document.createElement('div');
      el.id = 'a11y-announcement';
      el.setAttribute('aria-live', politeness);
      el.className = 'sr-only';
      document.body.appendChild(el);
      return el;
    })();

  // Update politeness if needed
  ariaLive.setAttribute('aria-live', politeness);

  // Force screen reader to announce by clearing and resetting content
  ariaLive.textContent = '';
  setTimeout(() => {
    ariaLive.textContent = message;
  }, 100);
};

/**
 * Check color contrast ratio
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @returns {number} Contrast ratio
 */
export const checkContrast = (foreground, background) => {
  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const fg = foreground.startsWith('#') ? hexToRgb(foreground) : foreground.match(/\d+/g).map(Number);
  const bg = background.startsWith('#') ? hexToRgb(background) : background.match(/\d+/g).map(Number);

  const lum1 = getLuminance(...fg);
  const lum2 = getLuminance(...bg);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};