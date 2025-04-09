import React from "react";
import { Trash2 } from "lucide-react"; // Icon for delete button

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 w-64">
      {/* Movie Title */}
      <h2 className="text-2xl font-semibold mb-2 truncate">{movie.title || "Untitled"}</h2>

      {/* Movie Details */}
      <p className="text-gray-400 text-sm mb-1">
        🎭 {movie.genre || "Unknown Genre"} | 📅 {movie.year || "N/A"}
      </p>
      <p className={`text-sm font-semibold ${movie.status === "Watched" ? "text-green-400" : "text-yellow-400"}`}>
        {movie.status || "No Status"}
      </p>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(movie._id)}
        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-full mt-4 hover:from-red-700 hover:to-red-500 transition-all shadow-md hover:shadow-lg"
        aria-label={`Remove ${movie.title}`}
      >
        <Trash2 size={18} /> Remove
      </button>
    </div>
  );
};

export default MovieCard;
