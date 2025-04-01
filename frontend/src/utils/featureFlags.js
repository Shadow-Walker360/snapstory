/**
 * Feature flag utilities
 */

// Default feature flags (can be overridden by environment variables)
const DEFAULT_FEATURE_FLAGS = {
  NEW_DASHBOARD: false,
  PAYMENT_INTEGRATION: false,
  SOCIAL_LOGIN: true,
  DARK_MODE: true,
  EXPERIMENTAL_FEATURES: false
};

/**
 * Get current feature flags
 * @returns {Object} Feature flags configuration
 */
export const getFeatureFlags = () => {
  // In production, these could come from environment variables or API
  if (process.env.NODE_ENV === 'development') {
    return DEFAULT_FEATURE_FLAGS;
  }
  
  // Merge with any environment-specific flags
  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...(process.env.REACT_APP_FEATURE_FLAGS 
      ? JSON.parse(process.env.REACT_APP_FEATURE_FLAGS) 
      : {})
  };
};

/**
 * Check if a feature is enabled
 * @param {string} feature - Feature name
 * @returns {boolean} True if feature is enabled
 */
export const isFeatureEnabled = (feature) => {
  const flags = getFeatureFlags();
  return flags[feature] === true;
};

/**
 * Feature component - renders children only if feature is enabled
 * @param {string} feature - Feature name
 * @param {ReactNode} children - Children to render
 * @param {ReactNode} fallback - Fallback content (optional)
 */
export const Feature = ({ feature, children, fallback = null }) => {
  return isFeatureEnabled(feature) ? children : fallback;
};

/**
 * Feature hook
 * @param {string} feature - Feature name
 * @returns {boolean} Feature enabled status
 */
export const useFeature = (feature) => {
  return isFeatureEnabled(feature);
};

/**
 * Feature gate - throws error if feature is not enabled
 * @param {string} feature - Feature name
 * @throws {Error} If feature is not enabled
 */
export const featureGate = (feature) => {
  if (!isFeatureEnabled(feature)) {
    throw new Error(`Feature "${feature}" is not enabled`);
  }
};