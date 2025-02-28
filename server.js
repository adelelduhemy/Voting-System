const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const Vote = require('./models/vote');
const Contact = require('./models/contact'); // Added contact model
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/voting-system';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/vote', (req, res) => res.sendFile(path.join(__dirname, 'public/vote.html')));
app.get('/results', (req, res) => res.sendFile(path.join(__dirname, 'public/results.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public/about.html')));

// User Registration and Voting
app.post('/api/register', async (req, res) => {
  const { voterName, voterEmail, password, candidate } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Vote.findOne({ voterEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'This email has already voted.' });
    }

    // Create and save user
    const newUser = new Vote({ voterName, voterEmail, password, candidate });
    await newUser.save();

    res.status(200).json({ message: 'User registered and vote submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

// Store contact form data in MongoDB
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit contact form.' });
  }
});

// API endpoint: Get voting results
app.get('/api/results', async (req, res) => {
  try {
    const votes = await Vote.find();
    const results = votes.reduce((acc, vote) => {
      acc[vote.candidate] = (acc[vote.candidate] || 0) + 1;
      return acc;
    }, {});
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
