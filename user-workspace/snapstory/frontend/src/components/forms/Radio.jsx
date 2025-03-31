import React from 'react';
import PropTypes from 'prop-types';

const Radio = React.forwardRef(({
  label,
  name,
  value,
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
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border ${error ? 'border-red-500' : 'border-gray-300'}`}
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

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default Radio;