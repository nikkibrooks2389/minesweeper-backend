require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);


// Database configuration
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
        process.exit(1);
    });


// Models
require('./models/LeaderBoard');


const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());


// Routes
app.use('/api/leaderboard', require('./routes/leaderboard'));


// Start server after successful DB connection
mongoose.connection.once('open', () => {
    const port = process.env.PORT || 3000;
    server.listen(port, '::', () => {
        console.log(`Server running on port ${port}`);
    });
});




