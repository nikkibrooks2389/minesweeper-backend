const express = require('express');
const router = express.Router();
const LeaderBoard = require('../models/LeaderBoard');

// Submit LeaderBoard
router.post('/', async (req, res) => {
    try {
        const newLeaderBoard = new LeaderBoard(req.body);
        await newLeaderBoard.save();
        res.status(201).send(newLeaderBoard);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderboards = await LeaderBoard.find({}).sort({ time: 1 }); // Sort by time ascending
        res.send(leaderboards);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;