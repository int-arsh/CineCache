import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetailsPage = ({ watchlist, addToWatchlist, removeFromWatchlist }) => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`https://www.omdbapi.com/?apikey=7c59db30&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch details.");
        setLoading(false);
      });
  }, [imdbID]);

  const inWatchlist = watchlist.some((m) => m.imdbID === imdbID);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4">
      <button
        className="mb-4 self-start px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      {loading ? (
        <div className="flex justify-center items-center py-10 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 py-10 w-full">{error}</div>
      ) : movie ? (
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full flex flex-col sm:flex-row gap-6">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
            alt={movie.Title}
            className="w-40 h-60 object-cover rounded bg-gray-700 mx-auto sm:mx-0"
          />
          <div className="flex-1 flex flex-col">
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
            <div className="mt-4">
              {inWatchlist ? (
                <button
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white w-full"
                  onClick={() => removeFromWatchlist(imdbID)}
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white w-full"
                  onClick={() => addToWatchlist(movie)}
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetailsPage; 