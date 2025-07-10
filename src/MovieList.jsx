import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading, onAdd, watchlist }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-400 py-10">No movies found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onAdd={onAdd}
          inWatchlist={watchlist.some((m) => m.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default MovieList; 