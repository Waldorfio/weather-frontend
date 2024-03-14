import React, { useState } from 'react';

function App() {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Weather App</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter location..."
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Get Weather</button>
        </form>
      </div>
    </div>
  );
}

export default App;
