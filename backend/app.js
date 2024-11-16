const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config

const routes = require('./routes/ToDoRoutes')

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(cors())

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

require('dotenv').config();

const mongoUri = process.env.MONGODB_URL;

//Connect to MongoDB 
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('MongoDB connection error:', err));

//Use express routes
app.use(routes);

// Run server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
