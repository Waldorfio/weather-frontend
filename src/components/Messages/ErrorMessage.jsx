import React from 'react';

const ErrorMessage = ({ msg }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
      {msg}
    </div>
  );
};

export default ErrorMessage;
