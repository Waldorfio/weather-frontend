import React from 'react'

const UserPreferences = ({ celsius, setCelsius, setModalOpen }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={() => setModalOpen(false)}>
      <div className="flex gap-[35px] flex-col items-center bg-white p-8 rounded-md shadow-md animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-center">User Preferences</h2>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-gray-700 font-[700]">°F</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch-2" type="checkbox" className="peer sr-only" checked={celsius} onChange={(e) => setCelsius(e.target.checked)} />
            <label htmlFor="switch-2" className="hidden"></label>
            <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
          </label>
          <span className="text-sm text-gray-700 font-[700]">°C</span>
        </div>
        <button onClick={() => setModalOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mx-auto block">
          Close
        </button>
      </div>
    </div>
  )
}

export default UserPreferences
