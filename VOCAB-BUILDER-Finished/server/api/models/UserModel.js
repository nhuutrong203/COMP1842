const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = new mongoose.Schema({ // // Define the User schema for MongoDB
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role : {
        type: String,
        required: true,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'users' });  // define 'users' collection in MongoDB

module.exports = mongoose.model('User', UserSchema); // export the User model based on the schema