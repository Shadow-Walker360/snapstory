import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTimes 
} from 'react-icons/fa';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300); // Wait for fade-out animation
  };

  if (!visible) return null;

  const typeStyles = {
    success: 'bg-green-100 text-green-700 border-green-300',
    error: 'bg-red-100 text-red-700 border-red-300',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    info: 'bg-blue-100 text-blue-700 border-blue-300'
  };

  const typeIcons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaExclamationTriangle className="text-red-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />
  };

  return (
    <div className={`fixed bottom-4 right-4 border-l-4 ${typeStyles[type]} p-4 rounded shadow-lg max-w-md z-50 transition-opacity duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          {typeIcons[type]}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default Toast;