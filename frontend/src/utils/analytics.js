/**
 * Analytics utilities
 */

/**
 * Initialize analytics
 * @param {string} trackingId - Analytics tracking ID
 */
export const initAnalytics = (trackingId) => {
  if (window.gtag) {
    window.gtag('config', trackingId, {
      send_page_view: false
    });
  }
};

/**
 * Track page view
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
};

/**
 * Track custom event
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} label - Event label
 * @param {number} value - Event value
 */
export const trackEvent = (category, action, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

/**
 * Track form submission
 * @param {string} formName - Form name/identifier
 */
export const trackFormSubmission = (formName) => {
  trackEvent('forms', 'submit', formName);
};

/**
 * Track authentication events
 * @param {string} action - Auth action (login, logout, register)
 */
export const trackAuthEvent = (action) => {
  trackEvent('authentication', action);
};

/**
 * Track errors
 * @param {string} errorType - Error type/category
 * @param {string} message - Error message
 */
export const trackError = (errorType, message) => {
  trackEvent('errors', errorType, message);
};