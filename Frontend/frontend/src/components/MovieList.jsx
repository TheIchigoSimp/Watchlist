import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addMovie = (newMovie) => {
    setMovies((prev) => [...prev, newMovie]);
  };
  

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/movies/${id}`)
      .then(() => setMovies((prev) => prev.filter((movie) => movie._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-black min-h-screen p-5">
      <h1 className="text-white text-3xl mb-4">My Watchlist</h1>
      <MovieForm onMovieAdded={addMovie} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie, index) => (
  movie && movie._id ? (
    <MovieCard key={movie._id} movie={movie} onDelete={deleteMovie} />
  ) : (
    console.warn("Skipped invalid movie at index:", index, movie)
  )
))}

      </div>
    </div>
  );
};

export default MovieList;
