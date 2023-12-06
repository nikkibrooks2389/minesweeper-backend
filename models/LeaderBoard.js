const mongoose = require('mongoose');

const LeaderBoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    level: { type: String, enum: ['beginner', 'normal', 'hard'], required: true },
});

const LeaderBoard = mongoose.model('LeaderBoard', LeaderBoardSchema);

module.exports = LeaderBoard;