const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//Movie Schema & Model
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    year: String,
    status: String
});
const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Movie API!');
});

app.post('/add-movie', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    }
    catch (error) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    }
    catch (error) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Movie deleted successfully' });
    }
    catch(err)
    {
        res.status(500).json({ error: err.message });
    }
});

//Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));