import React from "react";

const MovieCard = ({ movie, onAdd, inWatchlist, onShowDetails }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition relative"
      onClick={() => onShowDetails && onShowDetails(movie.imdbID)}
      tabIndex={0}
      role="button"
      aria-label={`Show details for ${movie.Title}`}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
        alt={movie.Title}
        className="w-32 h-48 object-cover rounded mb-4 bg-gray-700"
      />
      <div className="text-lg font-semibold mb-1 text-center">{movie.Title}</div>
      <div className="text-gray-400 mb-3">{movie.Year}</div>
      <button
        className={`px-3 py-1 rounded w-full ${inWatchlist ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} transition`}
        onClick={e => { e.stopPropagation(); onAdd(movie); }}
        disabled={inWatchlist}
      >
        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard; 