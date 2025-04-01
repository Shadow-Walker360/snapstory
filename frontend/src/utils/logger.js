/**
 * Logging utilities
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

let currentLogLevel = LOG_LEVELS.DEBUG;

/**
 * Set log level
 * @param {'DEBUG'|'INFO'|'WARN'|'ERROR'} level - Log level
 */
export const setLogLevel = (level) => {
  currentLogLevel = LOG_LEVELS[level] ?? LOG_LEVELS.DEBUG;
};

/**
 * Log debug message
 * @param {string} message - Log message
 * @param {*} [data] - Additional data
 */
export const debug = (message, data) => {
  if (currentLogLevel <= LOG_LEVELS.DEBUG) {
    console.debug(`[DEBUG] ${message}`, data);
  }
};

/**
 * Log info message
 * @param {string} message - Log message
 * @param {*} [data] - Additional data
 */
export const info = (message, data) => {
  if (currentLogLevel <= LOG_LEVELS.INFO) {
    console.info(`[INFO] ${message}`, data);
  }
};

/**
 * Log warning message
 * @param {string} message - Log message
 * @param {*} [data] - Additional data
 */
export const warn = (message, data) => {
  if (currentLogLevel <= LOG_LEVELS.WARN) {
    console.warn(`[WARN] ${message}`, data);
  }
};

/**
 * Log error message
 * @param {string} message - Log message
 * @param {*} [data] - Additional data
 */
export const error = (message, data) => {
  if (currentLogLevel <= LOG_LEVELS.ERROR) {
    console.error(`[ERROR] ${message}`, data);
  }
};

/**
 * Track performance metric
 * @param {string} name - Metric name
 * @param {number} value - Metric value
 * @param {Object} [tags] - Additional tags
 */
export const trackMetric = (name, value, tags = {}) => {
  if (currentLogLevel <= LOG_LEVELS.INFO) {
    console.info(`[METRIC] ${name}: ${value}`, tags);
  }
};

/**
 * Create a scoped logger
 * @param {string} scope - Logger scope
 * @returns {Object} Scoped logger instance
 */
export const createLogger = (scope) => ({
  debug: (message, data) => debug(`[${scope}] ${message}`, data),
  info: (message, data) => info(`[${scope}] ${message}`, data),
  warn: (message, data) => warn(`[${scope}] ${message}`, data),
  error: (message, data) => error(`[${scope}] ${message}`, data),
  metric: (name, value, tags) => trackMetric(`[${scope}] ${name}`, value, tags)
});

// Default logger instance
export default createLogger('app');