import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const FileUpload = ({
  label,
  name,
  accept = '*',
  multiple = false,
  onChange,
  error,
  className = '',
  ...props
}) => {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    onChange(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-4 text-center`}>
        <label className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              name={name}
              accept={accept}
              multiple={multiple}
              onChange={handleChange}
              className="hidden"
              {...props}
            />
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string
};

export default FileUpload;