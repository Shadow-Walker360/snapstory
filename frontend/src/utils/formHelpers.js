import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleApiError } from './errorUtils';

/**
 * Form helper utilities
 */

/**
 * Create form handler with validation
 * @param {Object} config - Form configuration
 * @param {Object} config.initialValues - Initial form values
 * @param {Object} config.validationSchema - Yup validation schema
 * @param {Function} config.onSubmit - Submit handler
 * @returns {Object} Formik instance
 */
export const useFormHandler = (config) => {
  return useFormik({
    initialValues: config.initialValues,
    validationSchema: Yup.object(config.validationSchema),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await config.onSubmit(values);
      } catch (error) {
        handleApiError(error);
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } finally {
        setSubmitting(false);
      }
    }
  });
};

/**
 * Common form validation schemas
 */
export const FORM_SCHEMAS = {
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  requiredString: (fieldName = 'Field') => 
    Yup.string().required(`${fieldName} is required`),
  requiredNumber: (fieldName = 'Field') =>
    Yup.number().required(`${fieldName} is required`),
  url: Yup.string()
    .url('Invalid URL format')
    .required('URL is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
};

/**
 * Get form field props for Formik
 * @param {Object} formik - Formik instance
 * @param {string} name - Field name
 * @returns {Object} Field props
 */
export const getFieldProps = (formik, name) => ({
  name,
  value: formik.values[name],
  onChange: formik.handleChange,
  onBlur: formik.handleBlur,
  error: formik.touched[name] && Boolean(formik.errors[name]),
  helperText: formik.touched[name] && formik.errors[name]
});

/**
 * Handle file upload in forms
 * @param {Object} formik - Formik instance
 * @param {string} fieldName - Field name
 * @param {File} file - File to upload
 */
export const handleFileUpload = (formik, fieldName, file) => {
  formik.setFieldValue(fieldName, file);
  formik.setFieldTouched(fieldName, true);
};

/**
 * Reset form to initial values
 * @param {Object} formik - Formik instance
 */
export const resetForm = (formik) => {
  formik.resetForm();
  formik.setSubmitting(false);
};