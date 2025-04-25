const express = require('express');
const vocabBuilder = require('../controllers/VocabController'); 
const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware'); // Middleware to check authentication and admin role

// Create an Express router
const router = express.Router();

// Define route for /words (GET all, POST new)
// Both routes require the user to be authenticated
router
  .route('/')
  .get(authenticate, vocabBuilder.list_all_words)     // List all vocabulary words
  .post(authenticate, vocabBuilder.create_a_word);    // Create a new vocabulary word

// Define routes for specific word operations using word ID
router
  .route('/:wordId')
  .get(authenticate, vocabBuilder.read_a_word)         // Read details of one word
  .put(authenticate, vocabBuilder.update_a_word)       // Update a specific word
  .delete(authenticate, authenticateAdmin, vocabBuilder.delete_a_word); // Delete word (admin only)

// Export the router to be used in server.js
module.exports = router;
