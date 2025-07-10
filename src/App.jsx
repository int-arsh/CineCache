import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import Watchlist from "./Watchlist";

const WATCHLIST_KEY = "cinecache_watchlist";

const SUGGESTED_MOVIES = [
  {
    imdbID: "tt3896198",
    Title: "Guardians of the Galaxy Vol. 2",
    Year: "2017",
    Poster: "https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg"
  },
  {
    imdbID: "tt4154796",
    Title: "Avengers: Endgame",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTc5OTQ3NjAzNF5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwODI5OTM0Mw@@._V1_SX300.jpg"
  },
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmRhMC00ZDIzLWFmNTEtODM1ZmRlY2RhY2YxXkEyXkFqcGc@._V1_SX300.jpg"
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3NjAtNDQyZi00ZjQwLTg3YjMtYjYwZGRlYjYzYzQxXkEyXkFqcGc@._V1_SX300.jpg"
  }
];

const App = () => {
  const [view, setView] = useState("search");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_KEY);
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  // Persist watchlist
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch movies from OMDb API
  useEffect(() => {
    if (searchTerm.length < 3) {
      setMovies([]);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    fetch(
      `https://www.omdbapi.com/?apikey=7c59db30&s=${encodeURIComponent(searchTerm)}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => controller.abort();
  }, [searchTerm]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-3xl font-bold hover:text-blue-400 transition cursor-pointer bg-transparent border-none p-0"
            style={{ outline: "none" }}
            onClick={() => {
              setView("search");
              setSearchTerm("");
            }}
            aria-label="Go to home"
          >
            CineCache
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
            onClick={() => setView(view === "search" ? "watchlist" : "search")}
          >
            {view === "search" ? "Watchlist" : "Search"}
          </button>
        </div>
        {view === "search" ? (
          <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {searchTerm.length < 3 ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
                <MovieList
                  movies={SUGGESTED_MOVIES}
                  loading={false}
                  onAdd={addToWatchlist}
                  watchlist={watchlist}
                />
              </>
            ) : (
              <MovieList
                movies={movies}
                loading={loading}
                onAdd={addToWatchlist}
                watchlist={watchlist}
              />
            )}
          </>
        ) : (
          <Watchlist
            movies={watchlist}
            onRemove={removeFromWatchlist}
          />
        )}
      </div>
    </div>
  );
};

export default App;
