import { toast } from 'react-toastify';

/**
 * Error handling utilities
 */

/**
 * Handle API errors consistently
 * @param {Error} error - Error object
 * @param {string} context - Context for the error
 */
export const handleApiError = (error, context = 'Operation') => {
  console.error(`${context} failed:`, error);
  
  let message = 'An unexpected error occurred';
  
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        message = 'Invalid request data';
        break;
      case 401:
        message = 'Session expired, please login again';
        break;
      case 403:
        message = 'You do not have permission for this action';
        break;
      case 404:
        message = 'Requested resource not found';
        break;
      case 500:
        message = 'Server error, please try again later';
        break;
      default:
        message = error.response.data?.message || message;
    }
  } else if (error.request) {
    // Request was made but no response received
    message = 'Network error, please check your connection';
  }

  toast.error(`${context} failed: ${message}`);
};

/**
 * Handle form validation errors
 * @param {Object} errors - Validation errors
 * @param {Function} setFieldError - Formik setFieldError function
 */
export const handleValidationErrors = (errors, setFieldError) => {
  if (errors.details) {
    errors.details.forEach(detail => {
      setFieldError(detail.field, detail.message);
    });
  } else if (errors.message) {
    toast.error(errors.message);
  }
};

/**
 * Handle network errors
 * @param {Error} error - Network error
 */
export const handleNetworkError = (error) => {
  console.error('Network error:', error);
  toast.error('Network connection error. Please check your internet connection.');
};

/**
 * Handle unexpected errors
 * @param {Error} error - Unexpected error
 * @param {string} context - Error context
 */
export const handleUnexpectedError = (error, context = 'operation') => {
  console.error(`Unexpected error during ${context}:`, error);
  toast.error(`An unexpected error occurred during ${context}. Please try again.`);
};

/**
 * Error boundary fallback component
 */
export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded">
      <h3 className="font-bold">Something went wrong</h3>
      <pre className="text-sm">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
      >
        Try again
      </button>
    </div>
  );
};