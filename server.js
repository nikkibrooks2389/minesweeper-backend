const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

app.use(express.json()); // Middleware to parse JSON requests

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://nbrooks2389:Alyssa1989!.@cluster0.fbybmf8.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


const scoreSchema = new mongoose.Schema({
    name: String,
    time: Number,
    level: String, // 'beginner', 'normal', 'hard'
});

const Score = mongoose.model('Score', scoreSchema);

const cors = require('cors');
app.use(cors());


// Submit scoreserver.js

app.post('/api/scores', async (req, res) => {
    try {
        const newScore = new Score(req.body);
        await newScore.save();
        res.status(201).send(newScore);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get leaderboard
app.get('/api/scores', async (req, res) => {
    try {
        const scores = await Score.find({}).sort({ time: 1 }); // Sort by time ascending
        res.send(scores);
    } catch (error) {
        res.status(500).send(error.message);
    }
});