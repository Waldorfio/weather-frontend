import React from 'react';

const WarningMessage = ({ msg }) => {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md mb-4">
      {msg}
    </div>
  );
};

export default WarningMessage;
