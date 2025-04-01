import { useState } from 'react';
import * as validation from '../utils/formValidation';

const useForm = (initialValues, validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setValues({
      ...values,
      [name]: val
    });

    if (validateOnChange) {
      validateField(name, val);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    
    // Add field-specific validation logic
    switch(name) {
      case 'email':
        if (!validation.validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!validation.validatePassword(value)) {
          error = 'Password must be at least 8 characters with uppercase, lowercase and number';
        }
        break;
      // Add more field validations as needed
      default:
        if (!validation.validateRequired(value)) {
          error = 'This field is required';
        }
    }

    setErrors({
      ...errors,
      [name]: error
    });
    return !error;
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const fieldValid = validateField(key, values[key]);
      if (!fieldValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
    setValues,
    setErrors
  };
};

export default useForm;