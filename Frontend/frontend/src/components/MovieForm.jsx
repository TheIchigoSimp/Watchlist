import React, { useState } from "react";
import axios from "axios";

const MovieForm = ({ onMovieAdded }) => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("Action");
    const [status, setStatus] = useState("Watched");
    const [year, setYear] = useState("2023");  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("http://localhost:5000/add-movie", {title, genre, status, year}).then((res) => {
        if (onMovieAdded) {
          onMovieAdded(res.data); // send the newly added movie up to parent
        }
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <input
      className="p-2 rounded bg-gray-800 text-white"
      type="text"
      placeholder="Movie Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />

    <select
      className="p-2 rounded bg-gray-800 text-white"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option>Action</option>
      <option>Horror</option>
      <option>Comedy</option>
      <option>Drama</option>
      <option>Thriller</option>
      <option>Romance</option>
      <option>Sci-Fi</option>
    </select>

    <select
      className="p-2 rounded bg-gray-800 text-white"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option>Watched</option>
      <option>Watching</option>
      <option>Plan to Watch</option>
    </select>

    <select
      className="p-2 rounded bg-gray-800 text-white"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      {Array.from({ length: 30 }, (_, i) => 2000 + i).map((yr) => (
        <option key={yr} value={yr}>{yr}</option>
      ))}
    </select>

    <button
      type="submit"
      className="col-span-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
    >
      Add Movie
    </button>
  </form>
  );
};

export default MovieForm;
