/**
 * API response normalizer
 */

/**
 * Normalize successful API response
 * @param {Object} response - API response
 * @returns {Object} Normalized response
 */
export const normalizeSuccess = (response) => {
  return {
    success: true,
    data: response.data,
    meta: response.meta,
    status: response.status,
    headers: response.headers
  };
};

/**
 * Normalize error API response
 * @param {Error} error - API error
 * @returns {Object} Normalized error
 */
export const normalizeError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      status: error.response.status,
      message: error.response.data?.message || 'Request failed',
      errors: error.response.data?.errors,
      headers: error.response.headers
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      success: false,
      status: 0,
      message: 'Network error - no response received',
      isNetworkError: true
    };
  } else {
    // Something happened in setting up the request
    return {
      success: false,
      status: -1,
      message: error.message || 'Request setup failed'
    };
  }
};

/**
 * Normalize API response (handles both success and error)
 * @param {Promise} promise - API call promise
 * @returns {Promise} Normalized response
 */
export const normalizeResponse = async (promise) => {
  try {
    const response = await promise;
    return normalizeSuccess(response);
  } catch (error) {
    return normalizeError(error);
  }
};

/**
 * Normalize paginated response
 * @param {Object} response - Paginated API response
 * @returns {Object} Normalized pagination data
 */
export const normalizePagination = (response) => {
  return {
    data: response.data,
    pagination: {
      total: response.meta?.total,
      perPage: response.meta?.per_page,
      currentPage: response.meta?.current_page,
      lastPage: response.meta?.last_page
    }
  };
};