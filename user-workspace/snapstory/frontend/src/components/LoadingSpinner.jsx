import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl', 
    lg: 'text-6xl'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FaSpinner 
        className={`animate-spin ${sizes[size]} text-blue-500`} 
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;