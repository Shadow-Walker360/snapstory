import { tokenStorage, userStorage } from './storage';
import apiService from '../services/apiService';

/**
 * Authentication utilities
 */

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!tokenStorage.get();
};

/**
 * Login user and store tokens
 * @param {string} token - Auth token
 * @param {Object} user - User data
 */
export const login = (token, user) => {
  tokenStorage.set(token);
  userStorage.set(user);
  apiService.setAuthToken(token);
};

/**
 * Logout user and clear storage
 */
export const logout = () => {
  tokenStorage.remove();
  userStorage.remove();
  apiService.clearAuthToken();
};

/**
 * Get current user data
 * @returns {Object|null} User data
 */
export const getCurrentUser = () => {
  return userStorage.get();
};

/**
 * Check if user has required role
 * @param {string|Array} requiredRoles - Role(s) to check
 * @returns {boolean} True if user has required role
 */
export const hasRole = (requiredRoles) => {
  const user = getCurrentUser();
  if (!user || !user.roles) return false;
  
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return user.roles.some(role => roles.includes(role));
};

/**
 * Verify auth token validity
 * @returns {Promise<boolean>} True if token is valid
 */
export const verifyToken = async () => {
  try {
    const token = tokenStorage.get();
    if (!token) return false;
    
    // Replace with your actual token verification endpoint
    await apiService.get('/auth/verify');
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

/**
 * Refresh auth token
 * @returns {Promise<boolean>} True if token was refreshed
 */
export const refreshToken = async () => {
  try {
    // Replace with your actual token refresh endpoint
    const response = await apiService.post('/auth/refresh');
    login(response.token, response.user);
    return true;
  } catch (error) {
    logout();
    return false;
  }
};