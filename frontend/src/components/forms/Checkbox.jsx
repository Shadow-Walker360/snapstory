import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = React.forwardRef(({
  label,
  name,
  checked = false,
  onChange,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
          {...props}
        />
        <span className="ml-2 block text-sm text-gray-700">
          {label}
        </span>
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Checkbox;