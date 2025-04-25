// Import required modules
const express = require('express');
const userController = require('../controllers/UserController'); // Handles user-related logic
const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware'); // Middleware for auth and role check

// Create a router object
const router = express.Router();

// Public routes: No authentication needed
router.post('/register', userController.register_user); // User registration
router.post('/login', userController.login);             // User login

// Admin-only route: Get list of all users
router.get('/', authenticate, authenticateAdmin, userController.get_all_users);

// Authenticated user routes: Token required
router.get('/:id', authenticate, userController.get_user_by_id);      // Get user by ID
router.put('/:id', authenticate, userController.update_user);         // Update user info
router.delete('/:id', authenticate, authenticateAdmin, userController.delete_user); // Delete user (admin only)

// Export the router to be used in server.js
module.exports = router;
