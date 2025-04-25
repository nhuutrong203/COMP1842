  const express = require('express');            // Web framework for handling HTTP requests
  const cors = require('cors');                  // Allows cross-origin requests
  const mongoose = require('mongoose');          // Connects to MongoDB
  const bodyParser = require('body-parser');     
  const dotenv = require('dotenv');              // Loads environment variables from .env file

  // Import route files
  const vocabRoutes = require('./api/routes/VocabRoutes');
  const userRoutes = require('./api/routes/UserRoutes');

  // Load environment variables
  dotenv.config();

  const app = express();

  // Set up body parsers to handle form data and JSON
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(cors());

  // Connect to MongoDB using the URL from the .env file
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("MongoDB connected"))    // Log success
    .catch(err => {                                  // Log and exit on error
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

  // Set up API routes
  app.use('/users', userRoutes);   // All user-related routes start with /users
  app.use('/words', vocabRoutes);  // All vocabulary-related routes start with /words

  // Handle unknown routes (404 Not Found)
  app.use((req, res, next) => {
    res.status(404).json({ message: `${req.originalUrl} not found` });
  });

  // Global error handler (500 Internal Server Error)
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

  // Start the server on the specified port or default to 3000
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });



// you need to create new .env file that have same level with server.js file
// and add the following lines to it

// MONGO_URL='mongodb+srv://username:password@cluster0.cyxvj.mongodb.net/VocabBuilder?retryWrites=true&w=majority&appName=Cluster0'
// FRONTEND_URL='http://localhost:8080'
// JWT_SECRET='YOUR_SECRET_KEY'
// JWT_EXPIRES_IN=1d
