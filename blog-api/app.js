const express = require('express'); // Import express a light weight framework
const app = express(); // Init express, and save it in "app" variable
const mongoose = require('mongoose'); // Import mongoose, a tool that gives NoSQL DB (such as MongoDB the ability of a relationasl dB)
const bodyParser = require('body-parser'); // Import body-parser, for handling different data formats
const cors = require('cors'); // Import cors, for handling cross-origin request

// Middleware
app.use(cors()); // Allowing cross-origin request
app.use(bodyParser.json()); // Format data to JSON

const postRouter = require('./routes/posts');
app.use('/posts', postRouter);

// Routes
app.get('/', (req, res) => {
  res.send('Home page');
});

// Connect to db
mongoose.connect(
  'mongodb+srv://Cluster0:123posts@cluster0.qdgrg.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('DB connected');
  }
);

// Listen to server
app.listen(3000); // Listen through port 3000
