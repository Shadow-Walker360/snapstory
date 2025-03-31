/**
 * Testing utilities
 */

/**
 * Create mock API response
 * @param {Object} config - Mock configuration
 * @param {*} config.data - Response data
 * @param {number} config.status - HTTP status
 * @param {Object} config.headers - Response headers
 * @returns {Object} Mock response
 */
export const mockApiResponse = ({ data = null, status = 200, headers = {} }) => {
  return {
    data,
    status,
    statusText: 'OK',
    headers,
    config: {}
  };
};

/**
 * Create mock API error
 * @param {Object} config - Mock configuration
 * @param {string} config.message - Error message
 * @param {number} config.status - HTTP status
 * @param {Object} config.response - Error response data
 * @returns {Error} Mock error
 */
export const mockApiError = ({ message = 'Error', status = 500, response = {} }) => {
  const error = new Error(message);
  error.response = {
    data: response,
    status,
    statusText: 'Error',
    headers: {},
    config: {}
  };
  return error;
};

/**
 * Mock Redux store for testing
 * @param {Object} initialState - Initial state
 * @returns {Object} Mock store
 */
export const mockStore = (initialState = {}) => {
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn()
  };
  return store;
};

/**
 * Wait for async operations to complete
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const waitForAsync = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Mock React component props
 * @param {Object} props - Additional props
 * @returns {Object} Mock props
 */
export const mockComponentProps = (props = {}) => {
  return {
    history: { push: jest.fn() },
    location: { pathname: '/' },
    match: { params: {} },
    ...props
  };
};

/**
 * Mock React context provider
 * @param {Object} contextValue - Context value
 * @param {ReactNode} children - Child components
 * @returns {JSX.Element} Context provider
 */
export const MockContextProvider = ({ value, children }) => {
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};