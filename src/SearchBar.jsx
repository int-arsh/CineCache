import React from "react";

const SearchBar = ({ value, onChange }) => (
  <div className="mb-6">
    <input
      type="text"
      className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search movies..."
      value={value}
      onChange={e => onChange(e.target.value)}
      autoFocus
    />
  </div>
);

export default SearchBar; 