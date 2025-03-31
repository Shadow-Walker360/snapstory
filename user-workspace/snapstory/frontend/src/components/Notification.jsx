import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Notification = () => {
  const [notification, setNotification] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check for query params that might indicate a notification
    const params = new URLSearchParams(location.search);
    if (params.has('success')) {
      setNotification({
        type: 'success',
        message: params.get('success')
      });
    } else if (params.has('error')) {
      setNotification({
        type: 'error', 
        message: params.get('error')
      });
    } else if (params.has('info')) {
      setNotification({
        type: 'info',
        message: params.get('info')
      });
    }

    // Clear notification after 5 seconds
    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [location]);

  if (!notification) return null;

  const getNotificationStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheckCircle className="mr-2" />;
      case 'error':
        return <FaExclamationTriangle className="mr-2" />;
      case 'info':
        return <FaInfoCircle className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-4 right-4 border-l-4 ${getNotificationStyles()} p-4 rounded shadow-lg max-w-md z-50`}>
      <div className="flex items-center">
        {getNotificationIcon()}
        <span className="flex-grow">{notification.message}</span>
        <button 
          onClick={() => setNotification(null)}
          className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close notification"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Notification;