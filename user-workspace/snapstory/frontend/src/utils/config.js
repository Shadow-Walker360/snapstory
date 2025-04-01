/**
 * Configuration utilities
 */

const environments = {
  development: {
    apiBaseUrl: 'http://localhost:3000/api',
    debug: true,
    analytics: false,
    enableMockData: true
  },
  production: {
    apiBaseUrl: 'https://api.snapstory.com',
    debug: false,
    analytics: true,
    enableMockData: false
  },
  test: {
    apiBaseUrl: 'http://localhost:3001/api',
    debug: true,
    analytics: false,
    enableMockData: true
  }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';

/**
 * Get configuration value
 * @param {string} key - Configuration key
 * @returns {*} Configuration value
 */
export const getConfig = (key) => {
  // Check for environment variable override first
  const envVar = process.env[`REACT_APP_${key.toUpperCase()}`];
  if (envVar !== undefined) {
    try {
      return JSON.parse(envVar);
    } catch {
      return envVar;
    }
  }
  return environments[env][key];
};

/**
 * Get all configuration for current environment
 * @returns {Object} Full configuration
 */
export const getAllConfig = () => {
  const config = {...environments[env]};
  
  // Apply environment variable overrides
  Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP_'))
    .forEach(key => {
      const configKey = key.replace('REACT_APP_', '').toLowerCase();
      try {
        config[configKey] = JSON.parse(process.env[key]);
      } catch {
        config[configKey] = process.env[key];
      }
    });

  return config;
};

/**
 * Override configuration for testing
 * @param {Object} overrides - Configuration overrides
 */
export const overrideConfig = (overrides) => {
  if (env === 'test') {
    Object.assign(environments.test, overrides);
  }
};

/**
 * Reset configuration to defaults
 */
export const resetConfig = () => {
  environments.test = {
    apiBaseUrl: 'http://localhost:3001/api',
    debug: true,
    analytics: false,
    enableMockData: true
  };
};

// Initialize with environment variables
const config = getAllConfig();
export default config;