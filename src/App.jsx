import { useEffect, useState, useDeferredValue } from 'react';

import './App.css';
import SearchIcon from "./assets/search.svg";
import MovieCard from './MovieCard';

const App = () => {
  const [title, setTitle] = useState("");
  const deferredTitle = useDeferredValue(title)
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    if (deferredTitle !== "") {
      const response = await fetch(`${import.meta.env.VITE_OMDB_API_URL}&s=${deferredTitle}`);
      const data = await response.json();
      setMovies(data.Search);
    }
  }

  useEffect(() => {
    searchMovies();
  }, [title]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={title}
          onChange={handleChange}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={searchMovies}
        />
      </div>

      <div className="container">
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
