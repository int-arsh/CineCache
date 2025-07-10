import React from "react";

const MovieDetailsModal = ({ open, movie, loading, error, onClose }) => {
  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Close details overlay"
      />
      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 bg-gray-900 shadow-lg max-w-md w-full sm:w-[400px] p-6 transition-transform duration-300 transform ${open ? "translate-x-0" : "translate-x-full"} flex flex-col overflow-y-auto`}
        style={{ maxHeight: '100vh' }}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
          onClick={onClose}
          aria-label="Close details"
        >
          &times;
        </button>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-10">{error}</div>
        ) : movie ? (
          <div className="flex flex-col gap-6">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
              alt={movie.Title}
              className="w-40 h-60 object-cover rounded bg-gray-700 mx-auto"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{movie.Title} <span className="text-lg font-normal text-gray-400">({movie.Year})</span></h2>
              <div className="mb-2 text-sm text-gray-400">{movie.Genre}</div>
              <div className="mb-2"><span className="font-semibold">Director:</span> {movie.Director}</div>
              <div className="mb-2"><span className="font-semibold">Actors:</span> {movie.Actors}</div>
              <div className="mb-2"><span className="font-semibold">Runtime:</span> {movie.Runtime}</div>
              <div className="mb-2"><span className="font-semibold">Plot:</span> <span className="text-gray-200">{movie.Plot}</span></div>
              <div className="mb-2 flex flex-wrap gap-2">
                {movie.Ratings && movie.Ratings.map(r => (
                  <span key={r.Source} className="bg-blue-700 px-2 py-1 rounded text-xs">{r.Source}: {r.Value}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">IMDB ID: {movie.imdbID}</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MovieDetailsModal; 