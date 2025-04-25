const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VocabSchema = new Schema( // Define the Vocab schema for MongoDB
    {
        english: {
            type: String,
            required: 'English word cannot be blank'
        },
        german: {
            type: String,
            required: ' German word cannot be blank'
        },
        vietnamese: {
            type: String,
            required: ' Vietnamese word cannot be blank'
        }
        
    },
    {collection: 'vocab3'} // define 'vocab3' collection in MongoDB
);

module.exports = mongoose.model('Vocab', VocabSchema) // export the Vocab model based on the schema