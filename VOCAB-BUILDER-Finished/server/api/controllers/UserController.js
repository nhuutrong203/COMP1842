const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Register a new user
exports.register_user = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' }); // Return error if exists
    }

    // Create a new user object and save it to the database
    const newUser = new User({ username, password });
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token and minimal user information
    res.status(201).json({
      token,
      user: { id: newUser._id, username: newUser.username }
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return error if user doesn't exist
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Return error if passwords don't match
    }

    // Create a JWT token after successful login
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token to the client
    res.json({ token });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
exports.get_all_users = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Return the list of users
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Handle server error
  }
};

// Get user by ID
exports.get_user_by_id = async (req, res) => {
  try {
    // Find user by ID in the request params
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return error if user is not found
    }
    res.json(user); // Return the user details
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Handle server error
  }
};

// Update user information
exports.update_user = async (req, res) => {
  try {
    // Find and update user by ID
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return error if user not found
    }
    res.json(user); // Return updated user details
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Handle server error
  }
};

// Delete a user
exports.delete_user = async (req, res) => {
  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Return error if user not found
    }
    res.json({ message: 'User deleted successfully' }); // Return success message
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); // Handle server error
  }
};
