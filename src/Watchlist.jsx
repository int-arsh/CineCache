import React from "react";

const Watchlist = ({ movies, onRemove, onShowDetails }) => {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-400 py-10">Your watchlist is empty.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="relative cursor-pointer hover:bg-gray-700 transition rounded-lg"
          onClick={() => onShowDetails && onShowDetails(movie.imdbID)}
          tabIndex={0}
          role="button"
          aria-label={`Show details for ${movie.Title}`}
        >
          <div className="absolute top-2 right-2 z-10">
            <button
              className="px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
              onClick={e => { e.stopPropagation(); onRemove(movie.imdbID); }}
            >
              Remove
            </button>
          </div>
          <div className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center opacity-80">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
              alt={movie.Title}
              className="w-32 h-48 object-cover rounded mb-4 bg-gray-700"
            />
            <div className="text-lg font-semibold mb-1 text-center">{movie.Title}</div>
            <div className="text-gray-400 mb-3">{movie.Year}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist; 