/**
 * UI Component Generator Utilities
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generate a reusable button component
 * @param {Object} config - Button configuration
 * @param {string} config.variant - Button variant
 * @param {string} config.size - Button size
 * @returns {React.Component} Button component
 */
export const generateButton = ({ 
  variant = 'primary', 
  size = 'md' 
} = {}) => {
  const Button = React.forwardRef(({
    children,
    className = '',
    ...props
  }, ref) => {
    const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  });

  Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
  };

  Button.defaultProps = {
    type: 'button'
  };

  return Button;
};

/**
 * Generate a reusable card component
 * @param {Object} config - Card configuration
 * @param {boolean} config.rounded - Whether to round corners
 * @param {boolean} config.shadow - Whether to add shadow
 * @returns {React.Component} Card component
 */
export const generateCard = ({
  rounded = true,
  shadow = 'md'
} = {}) => {
  const Card = ({
    children,
    className = '',
    ...props
  }) => {
    const baseClasses = 'bg-white border border-gray-200';
    const roundedClass = rounded ? 'rounded-lg' : '';
    const shadowClass = shadow ? `shadow-${shadow}` : '';

    return (
      <div className={`${baseClasses} ${roundedClass} ${shadowClass} ${className}`} {...props}>
        {children}
      </div>
    );
  };

  Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
  };

  return Card;
};

/**
 * Generate a reusable input component
 * @param {Object} config - Input configuration
 * @param {string} config.size - Input size
 * @returns {React.Component} Input component
 */
export const generateInput = ({
  size = 'md'
} = {}) => {
  const Input = React.forwardRef(({
    className = '',
    ...props
  }, ref) => {
    const baseClasses = 'block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-lg'
    };

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  });

  Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string
  };

  Input.defaultProps = {
    type: 'text'
  };

  return Input;
};

/**
 * Generate a reusable modal component
 * @returns {Object} Modal components { Modal, Header, Body, Footer }
 */
export const generateModal = () => {
  const Modal = ({ children, onClose, className = '' }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-lg max-w-md w-full ${className}`}>
        {children}
      </div>
    </div>
  );

  const Header = ({ children, className = '' }) => (
    <div className={`border-b p-4 flex justify-between items-center ${className}`}>
      <h3 className="text-lg font-medium">{children}</h3>
    </div>
  );

  const Body = ({ children, className = '' }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

  const Footer = ({ children, className = '' }) => (
    <div className={`border-t p-4 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );

  return {
    Modal,
    Header,
    Body,
    Footer
  };
};