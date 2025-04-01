import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = forwardRef(({
  label,
  selected,
  onChange,
  error,
  className = '',
  minDate,
  maxDate,
  showTimeSelect = false,
  ...props
}, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <DatePicker
        ref={ref}
        selected={selected}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat={showTimeSelect ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"}
        className={`block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  showTimeSelect: PropTypes.bool
};

export default CustomDatePicker;