/**
 * Testing helper utilities
 */

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

/**
 * Render a component with all necessary providers
 * @param {ReactNode} ui - Component to render
 * @param {Object} options - Render options
 * @param {Object} options.initialAuth - Initial auth state
 * @param {Object} options.initialTheme - Initial theme state
 * @param {string} options.route - Initial route
 * @returns {Object} Render result
 */
export const renderWithProviders = (ui, {
  initialAuth = {},
  initialTheme = { mode: 'light' },
  route = '/'
} = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider value={initialAuth}>
        <ThemeProvider value={initialTheme}>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

/**
 * Mock API response for testing
 * @param {*} data - Mock data
 * @param {number} status - HTTP status
 * @param {boolean} ok - Response ok status
 * @returns {Object} Mock response
 */
export const mockResponse = (data, status = 200, ok = true) => ({
  ok,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data)
});

/**
 * Create a mock function with Jest that preserves types
 * @template T
 * @param {T} implementation - Function implementation
 * @returns {jest.MockedFunction<T>} Mocked function
 */
export const typedMock = (implementation) => {
  return jest.fn(implementation);
};

/**
 * Wait for async operations to complete
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const wait = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Generate test props
 * @param {Object} overrides - Prop overrides
 * @returns {Object} Test props
 */
export const testProps = (overrides = {}) => ({
  history: { push: jest.fn() },
  location: { pathname: '/' },
  match: { params: {} },
  ...overrides
});

/**
 * Mock console.error during tests
 * @param {Function} testFn - Test function
 */
export const mockConsoleError = async (testFn) => {
  const originalError = console.error;
  console.error = jest.fn();
  
  try {
    await testFn();
  } finally {
    console.error = originalError;
  }
};

/**
 * Generate mock form event
 * @param {Object} overrides - Event overrides
 * @returns {Object} Mock form event
 */
export const mockFormEvent = (overrides = {}) => ({
  preventDefault: jest.fn(),
  target: {
    reset: jest.fn(),
    elements: {}
  },
  ...overrides
});